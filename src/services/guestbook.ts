import { supabase } from '@/lib/supabase/client'

export const MESSAGES_PAGE_SIZE = 12
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/**
 * Retorna os headers de autenticação para chamadas a Edge Functions.
 * Obtém o access_token da sessão atual e o passa explicitamente no header
 * Authorization, evitando problemas de timing com o setAuth() do FunctionsClient.
 */
async function getAuthHeaders(): Promise<Record<string, string>> {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session?.access_token) throw new Error('User not authenticated')
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${session.access_token}`,
  }
}

/**
 * Camada de serviço para o guestbook, abstraindo detalhes de implementação.
 *
 * O objetivo é centralizar a lógica de acesso a dados e chamadas de funções,
 * permitindo que os componentes consumam uma API simples e consistente, sem se preocupar com detalhes de RLS, validação ou estrutura do banco.
 */

export const guestbookService = {
  getMessages: async ({ from = 0, to = MESSAGES_PAGE_SIZE - 1 } = {}) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*, guests(name, profile_image)')
      .order('pinned', { ascending: false })
      .order('created_at', { ascending: false })
      .range(from, to)
    if (error) throw error
    return data
  },

  // Chamada para a Edge Function (POST)
  createMessage: async (content: string, guestId: string) => {
    const headers = await getAuthHeaders()
    const { data, error } = await supabase.functions.invoke('create-message', {
      body: { content, guest_id: guestId },
      headers,
    })
    if (error) throw error
    return data
  },

  updateMessage: async (id: number, content: string) => {
    const headers = await getAuthHeaders()
    const { data, error } = await supabase.functions.invoke('update-message', {
      body: { id, content },
      headers,
    })
    if (error) throw error
    return data
  },

  deleteMessage: async (id: number) => {
    const headers = await getAuthHeaders()
    const { data, error } = await supabase.functions.invoke('delete-message', {
      body: { id },
      headers,
    })
    if (error) throw error
    return data
  },
}
