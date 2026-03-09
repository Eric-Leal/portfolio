import 'jsr:@std/dotenv/load'
import { assertEquals } from 'jsr:@std/assert'
import { createClient } from 'npm:@supabase/supabase-js@2'
import {
  createRealTestUser,
  clearAllTestData,
  releaseBody,
} from '../_shared/test-helpers'
import { createAdminClient } from '../_shared/supabaseAdmin'

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? 'http://127.0.0.1:54321'
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
const admin = createAdminClient()
const client = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
})

/**
 * Suíte de testes para a Edge Function `update-message`.
 *
 * Para executar os testes:
 * deno test --allow-all --env-file=.env.test supabase/functions/tests/update-message_test.ts
 */

// --- Casos de teste separados ---

Deno.test('TC-01: atualiza conteúdo com sucesso', async () => {
  const user = await createRealTestUser()
  const { data: msg } = await admin
    .from('messages')
    .insert({ content: 'Original', guest_id: user.userId })
    .select()
    .single()

  const { data, error } = await client.functions.invoke('update-message', {
    body: { id: msg.id, content: 'Novo Conteúdo' },
    headers: { Authorization: user.authHeader },
  })
  try {
    assertEquals(error, null)
    assertEquals(data.content, 'Novo Conteúdo')
  } finally {
    await releaseBody(error)
  }
})

Deno.test('TC-02: rejeita conteúdo vazio com 400', async () => {
  const user = await createRealTestUser()
  const { data: msg } = await admin
    .from('messages')
    .insert({ content: 'Original', guest_id: user.userId })
    .select()
    .single()

  const { error } = await client.functions.invoke('update-message', {
    body: { id: msg.id, content: '' },
    headers: { Authorization: user.authHeader },
  })
  try {
    assertEquals(error?.context?.status, 400)
  } finally {
    await releaseBody(error)
  }
})

Deno.test(
  'TC-03: não permite atualizar mensagem de outro usuário (403)',
  async () => {
    const user = await createRealTestUser()
    const { data: msg } = await admin
      .from('messages')
      .insert({ content: 'Original', guest_id: user.userId })
      .select()
      .single()

    const otherUser = await createRealTestUser()
    const { error } = await client.functions.invoke('update-message', {
      body: { id: msg.id, content: 'Tentativa Maliciosa' },
      headers: { Authorization: otherUser.authHeader },
    })
    try {
      assertEquals(error?.context?.status, 403)
    } finally {
      await releaseBody(error)
    }
  },
)

Deno.test('Teardown: limpeza geral do banco (update-message)', async () => {
  await clearAllTestData()
})
