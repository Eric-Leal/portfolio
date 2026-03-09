import 'jsr:@std/dotenv/load'

import { assertEquals, assertExists } from 'jsr:@std/assert'
import { createClient, SupabaseClient } from 'npm:@supabase/supabase-js@2'
import {
  clearAllTestData,
  createRealTestUser,
  generateMockMessage,
  releaseBody,
} from '../_shared/test-helpers.ts'

/**
 * Suíte de testes para a Edge Function `create-message`.
 *
 * Cada teste usa `createRealTestUser` para obter um JWT real emitido pelo
 * Supabase local, garantindo que as RLS policies sejam exercitadas com
 * autenticação idêntica à de produção.
 *
 * O bloco `finally { await releaseBody(error) }` em cada caso cancela o
 * ReadableStream da resposta HTTP não consumida, evitando o aviso
 * "fetch response body leaked" do Deno test runner.
 *
 * Para rodar os testes:
 * deno test --allow-all --env-file=.env.test supabase/functions/tests/create-message_test.ts
 */

// ---------------------------------------------------------------------------
// Configuração base — `SUPABASE_URL` e `SUPABASE_ANON_KEY` são injetadas
// automaticamente pelo Supabase CLI ao executar `supabase functions serve`
// ou via arquivo .env na raiz do projeto.
// ---------------------------------------------------------------------------
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? 'http://127.0.0.1:54321'
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''

/**
 * Cliente único reutilizado em todos os testes para invocar Edge Functions.
 * `autoRefreshToken` e `persistSession` desativados para evitar timers
 * pendentes que o Deno test runner reportaria como "timer leak".
 */
const client: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// ---------------------------------------------------------------------------
// TC-01 — Auth Missing
// ---------------------------------------------------------------------------

/**
 * Garante que a função retorna 401 quando o header `Authorization` está ausente.
 * O SDK envia o anon key por padrão; sobrescrevemos com string vazia para simular
 * uma requisição sem autenticação e verificamos o status no contexto do erro.
 */
Deno.test('TC-01: retorna 401 quando Authorization está ausente', async () => {
  const { data: _data, error } = await client.functions.invoke(
    'create-message',
    {
      body: { content: 'hello', guest_id: 'some-uuid' },
      headers: { Authorization: '' },
    },
  )
  try {
    assertEquals(error?.context?.status, 401)
  } finally {
    await releaseBody(error)
  }
})

// ---------------------------------------------------------------------------
// TC-02 — Happy Path
// ---------------------------------------------------------------------------

/**
 * Fluxo feliz: usuário autenticado envia 100 caracteres válidos.
 * O JWT real obtido via `createRealTestUser` é passado em `Authorization`,
 * fazendo o Supabase validar o token contra o banco local.
 * Espera-se `error === null` e um campo `id` no objeto `data` retornado.
 */
Deno.test(
  "TC-02: cria mensagem válida e retorna registro com 'id'",
  async () => {
    const { authHeader, userId } = await createRealTestUser()
    const body = generateMockMessage(userId, 100)

    const { data, error } = await client.functions.invoke('create-message', {
      body,
      headers: { Authorization: authHeader },
    })
    try {
      assertEquals(error, null)
      assertExists(
        data?.id,
        "Resposta deve conter o campo 'id' do registro criado",
      )
    } finally {
      await releaseBody(error)
    }
  },
)

// ---------------------------------------------------------------------------
// TC-03 — Empty Content
// ---------------------------------------------------------------------------

/**
 * Confirma que `content: ""` é rejeitado com 400 antes de qualquer acesso ao banco.
 * A guarda `!content` na Edge Function avalia strings vazias como falsy,
 * lançando o erro de validação sem realizar nenhuma insert.
 */
Deno.test('TC-03: rejeita conteúdo vazio com erro 400', async () => {
  const { authHeader, userId } = await createRealTestUser()
  // generateMockMessage com length=0 produz content: ""
  const body = generateMockMessage(userId, 0)

  const { data: _data, error } = await client.functions.invoke(
    'create-message',
    {
      body,
      headers: { Authorization: authHeader },
    },
  )
  try {
    assertEquals(error?.context?.status, 400)
  } finally {
    await releaseBody(error)
  }
})

// ---------------------------------------------------------------------------
// TC-04 — Boundary Values (500 e 501 chars)
// Sub-testes do Deno para cobrir ambos os lados do limite em um único bloco.
// ---------------------------------------------------------------------------

/**
 * Boundary value analysis agrupada em sub-testes Deno:
 *  - 500 chars: limite exato — deve ser aceito (não dispara `content.length > 500`).
 *  - 501 chars: primeiro valor acima do limite — deve ser rejeitado com 400.
 * Sub-testes permitem identificar qual caso específico falhou sem ambiguidade.
 */
Deno.test('TC-04: testes de limite de tamanho (500 / 501 chars)', async (t) => {
  await t.step(
    '500 chars deve ser aceito (limite superior válido)',
    async () => {
      const { authHeader, userId } = await createRealTestUser()
      const body = generateMockMessage(userId, 500)

      const { data, error } = await client.functions.invoke('create-message', {
        body,
        headers: { Authorization: authHeader },
      })
      try {
        assertEquals(error, null)
        assertExists(data?.id)
      } finally {
        await releaseBody(error)
      }
    },
  )

  await t.step(
    '501 chars deve ser rejeitado com 400 (limite excedido)',
    async () => {
      const { authHeader, userId } = await createRealTestUser()
      const body = generateMockMessage(userId, 501)

      const { data: _data, error } = await client.functions.invoke(
        'create-message',
        {
          body,
          headers: { Authorization: authHeader },
        },
      )
      try {
        assertEquals(error?.context?.status, 400)
      } finally {
        await releaseBody(error)
      }
    },
  )
})

// ---------------------------------------------------------------------------
// TC-05 — Payload Integrity
// ---------------------------------------------------------------------------

/**
 * Valida a integridade dos dados persistidos: o `guest_id` retornado pelo banco
 * deve ser idêntico ao `sub` claim do JWT enviado na requisição.
 * Isso confirma que as RLS policies estão ativas e que a Edge Function não
 * alterou nem substituiu o identificador do usuário durante o processamento.
 */
Deno.test('TC-05: guest_id retornado é idêntico ao sub do JWT', async () => {
  const { authHeader, userId } = await createRealTestUser()
  const body = generateMockMessage(userId, 100)

  const { data, error } = await client.functions.invoke('create-message', {
    body,
    headers: { Authorization: authHeader },
  })
  try {
    assertEquals(error, null)
    assertEquals(
      data?.guest_id,
      userId,
      `guest_id "${data?.guest_id}" deve ser igual ao sub do token "${userId}"`,
    )
  } finally {
    await releaseBody(error)
  }
})

// ---------------------------------------------------------------------------
// Teardown — executa após todos os casos de teste
// ---------------------------------------------------------------------------

/**
 * Remove todos os dados inseridos durante a suíte de testes em três etapas:
 *  1. Deleta todas as linhas de `public.messages`.
 *  2. Lista os IDs de `public.guests` e deleta cada auth user via Admin API.
 *  3. O CASCADE da FK `guests.id → auth.users` limpa `public.guests` automaticamente.
 *
 * Usa o Admin Client (service_role) para bypassar as RLS policies e garantir
 * limpeza total, independente de qual usuário criou os dados.
 */
Deno.test('Teardown: Limpeza Geral do Banco', async () => {
  await clearAllTestData()
})
