import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

/**
 * Supabase client para uso em Client Components ('use client').
 * Mantém uma instância singleton por render de página.
 */
export function createClient() {
  return supabase
}

// Exporta também o objeto `supabase` para importação direta quando necessário.
// Criamos a instância aqui para manter comportamento singleton em Client Components.
export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)
