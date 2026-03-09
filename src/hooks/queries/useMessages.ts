import { useInfiniteQuery } from '@tanstack/react-query'
import { guestbookService, MESSAGES_PAGE_SIZE } from '@/services/guestbook'

/**
 * Hook para obter as mensagens do guestbook com paginação infinita.
 * Cada página carrega `MESSAGES_PAGE_SIZE` itens. Retorna `hasNextPage` para
 * controlar a visibilidade do botão "Load more".
 */
export function useMessages() {
  return useInfiniteQuery({
    queryKey: ['messages'],
    queryFn: ({ pageParam = 0 }) => {
      const from = pageParam * MESSAGES_PAGE_SIZE
      const to = from + MESSAGES_PAGE_SIZE - 1
      return guestbookService.getMessages({ from, to })
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < MESSAGES_PAGE_SIZE) return undefined
      return allPages.length
    },
    staleTime: 1000 * 60 * 10,
  })
}
