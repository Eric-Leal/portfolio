import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

/**
 * Cria um cliente que respeita as RLS policies.
 */
export const createSupabaseClient = (authHeader: string) => {
  const url = Deno.env.get('SUPABASE_URL') ?? 'http://127.0.0.1:54321'
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''

  return createClient(url, anonKey, {
    global: {
      headers: {
        Authorization: authHeader,
        apikey: anonKey, // Necessário para o gateway do Supabase
      },
    },
  })
}
