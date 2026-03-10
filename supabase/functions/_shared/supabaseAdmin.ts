import {
  createClient,
  SupabaseClient,
} from 'https://esm.sh/@supabase/supabase-js@2'

/**
 * Cliente Admin (Service Role) para bypass de RLS.
 */
export function createAdminClient(): SupabaseClient {
  const url = Deno.env.get('SUPABASE_URL') ?? 'http://127.0.0.1:54321'
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
