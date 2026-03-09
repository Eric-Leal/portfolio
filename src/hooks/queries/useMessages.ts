import { useQuery } from '@tanstack/react-query'
import { guestbookService } from '@/services/guestbook'

/**
 * Hook para obter as mensagens do guestbook.
 * @returns O resultado da query, incluindo dados, estado de carregamento e erros.
 */

export function useMessages() {
  return useQuery({
    queryKey: ['messages'],
    queryFn: guestbookService.getMessages,
    staleTime: 1000 * 60 * 10, // Mantém os dados "frescos" por 10 minutos
  })
}
