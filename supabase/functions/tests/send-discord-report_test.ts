import 'jsr:@std/dotenv/load'
import { assertEquals } from 'jsr:@std/assert'
import {
  clearAllTestData,
  createRealTestUser,
} from '../_shared/test-helpers.ts'
import { createAdminClient } from '../_shared/supabaseAdmin.ts'

/**
 * Suíte de testes para a Edge Function `send-discord-report`.
 * Simula o comportamento do Trigger do Supabase enviando apenas o ID da mensagem.
 *
 * Para rodar:
 * deno test --allow-all --env-file=.env.test supabase/functions/tests/send-discord-report_test.ts
 */

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? 'http://127.0.0.1:54321'
const admin = createAdminClient()

// Headers para simular o trigger do banco (função interna, verify_jwt = false)
const triggerHeaders = { 'Content-Type': 'application/json' }

// ---------------------------------------------------------------------------
// TC-01 — INSERT
// ---------------------------------------------------------------------------
Deno.test(
  'TC-01: INSERT - deve notificar Discord e retornar status 200',
  async () => {
    const user = await createRealTestUser()
    const { data: message } = await admin
      .from('messages')
      .insert({
        content: 'Mensagem de teste para o Discord (INSERT)',
        guest_id: user.userId,
      })
      .select()
      .single()

    const res = await fetch(`${supabaseUrl}/functions/v1/send-discord-report`, {
      method: 'POST',
      headers: triggerHeaders,
      body: JSON.stringify({ type: 'INSERT', record: { id: message.id } }),
    })

    const result = await res.json()
    assertEquals(res.status, 200)
    assertEquals(result.status, 'notified')
  },
)

// ---------------------------------------------------------------------------
// TC-02 — UPDATE
// ---------------------------------------------------------------------------
Deno.test(
  'TC-02: UPDATE - deve notificar Discord sobre edição e retornar 200',
  async () => {
    const user = await createRealTestUser()
    const { data: message } = await admin
      .from('messages')
      .insert({
        content: 'Mensagem original para teste de edição (UPDATE)',
        guest_id: user.userId,
      })
      .select()
      .single()

    const res = await fetch(`${supabaseUrl}/functions/v1/send-discord-report`, {
      method: 'POST',
      headers: triggerHeaders,
      body: JSON.stringify({ type: 'UPDATE', record: { id: message.id } }),
    })

    const result = await res.json()
    assertEquals(res.status, 200)
    assertEquals(result.status, 'notified')
  },
)

// ---------------------------------------------------------------------------
// TC-03 — ID inexistente
// ---------------------------------------------------------------------------
Deno.test(
  'TC-03: deve retornar 500 para ID de mensagem inexistente',
  async () => {
    const res = await fetch(`${supabaseUrl}/functions/v1/send-discord-report`, {
      method: 'POST',
      headers: triggerHeaders,
      body: JSON.stringify({ type: 'INSERT', record: { id: 999999 } }),
    })

    assertEquals(res.status, 500)
    await res.body?.cancel()
  },
)

// ---------------------------------------------------------------------------
// TC-04 — RELATÓRIO dos ultimos 6 dias (CRON)
// ---------------------------------------------------------------------------
Deno.test(
  'TC-04: WEEKLY_REPORT - deve gerar estatísticas dos últimos 6 dias e retornar 200',
  async () => {
    const res = await fetch(`${supabaseUrl}/functions/v1/send-discord-report`, {
      method: 'POST',
      headers: triggerHeaders,
      body: JSON.stringify({ type: 'WEEKLY_REPORT' }),
    })

    const result = await res.json()
    assertEquals(res.status, 200)
    assertEquals(result.status, 'notified')
  },
)

// ---------------------------------------------------------------------------
// Teardown
// ---------------------------------------------------------------------------
Deno.test(
  'Teardown: limpeza geral do banco (send-discord-report)',
  async () => {
    await clearAllTestData()
  },
)
