import { useMutation, useQueryClient } from '@tanstack/react-query'
import { guestbookService } from '@/services/guestbook'
import { toast } from 'sonner'

/**
 * Hook para criar uma nova mensagem.
 */
export function useCreateMessage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ content, userId }: { content: string; userId: string }) =>
      guestbookService.createMessage(content, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] })
      toast.success('Message signed!')
    },
    onError: (error: { message: string }) => toast.error(error.message),
  })
}

/**
 * Hook para atualizar uma mensagem (edição).
 */
export function useUpdateMessage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, content }: { id: number; content: string }) =>
      guestbookService.updateMessage(id, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] })
      toast.success('Message updated!')
    },
    onError: (error: { message: string }) => toast.error(error.message),
  })
}

/**
 * Hook para deletar uma mensagem.
 */
export function useDeleteMessage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => guestbookService.deleteMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] })
      toast.success('Message deleted!')
    },
    onError: (error: { message: string }) => toast.error(error.message),
  })
}
