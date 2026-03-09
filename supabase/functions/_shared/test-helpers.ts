/// <reference lib="deno.ns" />
import { createClient, SupabaseClient } from 'npm:@supabase/supabase-js@2'

// ---------------------------------------------------------------------------
// Environment - Força o uso do ambiente local do Supabase CLI
// ---------------------------------------------------------------------------
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? 'http://127.0.0.1:54321'
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
const SUPABASE_SERVICE_ROLE_KEY =
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

// ---------------------------------------------------------------------------
// Admin Client (Singleton)
// ---------------------------------------------------------------------------
let _adminClient: SupabaseClient | null = null

function getAdminClient(): SupabaseClient {
  if (!_adminClient) {
    _adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  }
  return _adminClient
}

export interface RealTestUser {
  userId: string
  accessToken: string
  authHeader: string
}

/**
 * Cria um usuário real no auth.users local e retorna um JWT autêntico.
 * Resolve o erro de 'Unauthorized' por usar tokens mockados.
 */
export async function createRealTestUser(): Promise<RealTestUser> {
  const admin = getAdminClient()
  const email = `test_${crypto.randomUUID()}@test.local`
  const password = 'Password123!' // Senha padrão para testes

  // 1. Cria o usuário via Admin API (ignora confirmação de e-mail)
  const { data: created, error: createErr } = await admin.auth.admin.createUser(
    {
      email,
      password,
      email_confirm: true,
    },
  )

  if (createErr || !created.user) {
    throw new Error(`Falha ao criar usuário de teste: ${createErr?.message}`)
  }

  // 2. Faz login real para obter o JWT assinado pelo Supabase local
  const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const { data: signInData, error: signInErr } =
    await anonClient.auth.signInWithPassword({
      email,
      password,
    })

  if (signInErr || !signInData.session) {
    throw new Error(
      `Falha ao autenticar usuário de teste: ${signInErr?.message}`,
    )
  }

  return {
    userId: created.user.id,
    accessToken: signInData.session.access_token,
    authHeader: `Bearer ${signInData.session.access_token}`,
  }
}

/**
 * Libera o body de resposta de erros HTTP do Deno para evitar "leaks".
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function releaseBody(error: any): Promise<void> {
  try {
    if (
      error?.context?.body &&
      typeof error.context.body.cancel === 'function'
    ) {
      await error.context.body.cancel()
    }
  } catch {
    // Silencia se o body já estiver fechado
  }
}

/**
 * Gera payload de mensagem para os testes.
 */
export function generateMockMessage(userId: string, length: number) {
  return {
    content: 'a'.repeat(length),
    guest_id: userId,
  }
}

/**
 * Limpa todos os dados criados (After All).
 */
export async function clearAllTestData(): Promise<void> {
  const admin = getAdminClient()

  // Deleta mensagens
  await admin.from('messages').delete().neq('id', 0)

  // Lista e deleta usuários do Auth (o CASCADE limpa public.guests)
  const { data: guests } = await admin.from('guests').select('id')
  for (const guest of guests ?? []) {
    await admin.auth.admin.deleteUser(guest.id)
  }
}
