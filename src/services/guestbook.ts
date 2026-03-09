import { supabase } from '@/lib/supabase/client'

/**
 * Camada de serviço para o guestbook, abstraindo detalhes de implementação.
 *
 * O objetivo é centralizar a lógica de acesso a dados e chamadas de funções,
 * permitindo que os componentes consumam uma API simples e consistente, sem se preocupar com detalhes de RLS, validação ou estrutura do banco.
 */

export const guestbookService = {
  getMessages: async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*, guests(name, profile_image)')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  // Chamada para a Edge Function (POST)
  createMessage: async (content: string, guestId: string) => {
    const { data, error } = await supabase.functions.invoke('create-message', {
      body: { content, guest_id: guestId },
    })
    if (error) throw error
    return data
  },

  updateMessage: async (id: number, content: string) => {
    const { data, error } = await supabase.functions.invoke('update-message', {
      body: { id, content },
    })
    if (error) throw error
    return data
  },

  deleteMessage: async (id: number) => {
    const { data, error } = await supabase.functions.invoke('delete-message', {
      body: { id },
    })
    if (error) throw error
    return data
  },
}
