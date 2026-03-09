import 'jsr:@std/dotenv/load'
import { assertEquals } from 'jsr:@std/assert'
import { createClient } from 'npm:@supabase/supabase-js@2'
import {
  createRealTestUser,
  clearAllTestData,
  releaseBody,
} from '../_shared/test-helpers.ts'
import { createAdminClient } from '../_shared/supabaseAdmin.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? 'http://127.0.0.1:54321'
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
const admin = createAdminClient()
const client = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
})

/**
 * Suíte de testes para a Edge Function `delete-message`.
 *
 * Para executar os testes:
 * deno test --allow-all --env-file=.env.test supabase/functions/tests/delete-message_test.ts
 */

Deno.test(
  'TC-01: User B não deve conseguir deletar mensagem de User A (RLS)',
  async () => {
    const userA = await createRealTestUser()
    const userB = await createRealTestUser()
    const { data: msgA } = await admin
      .from('messages')
      .insert({ content: 'Msg User A', guest_id: userA.userId })
      .select()
      .single()

    const { error } = await client.functions.invoke('delete-message', {
      body: { id: msgA.id },
      headers: { Authorization: userB.authHeader },
    })
    // O banco pode retornar sucesso mas 0 linhas deletadas; validamos se a msg ainda existe
    const { data } = await admin
      .from('messages')
      .select()
      .eq('id', msgA.id)
      .single()
    assertEquals(data.id, msgA.id)
    await releaseBody(error)
  },
)

Deno.test('TC-02: User A deve deletar sua própria mensagem', async () => {
  const userA = await createRealTestUser()
  const { data: msgA } = await admin
    .from('messages')
    .insert({ content: 'Msg User A', guest_id: userA.userId })
    .select()
    .single()

  const { data, error } = await client.functions.invoke('delete-message', {
    body: { id: msgA.id },
    headers: { Authorization: userA.authHeader },
  })
  try {
    assertEquals(data.success, true)
  } finally {
    await releaseBody(error)
  }
})

Deno.test('Teardown: Limpeza Geral do Banco (delete-message)', async () => {
  await clearAllTestData()
})
