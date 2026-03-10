import { useMutation, useQueryClient } from '@tanstack/react-query'
import { guestbookService } from '@/services/guestbook'
import { toast } from 'sonner'
import { usePortfolioStore } from '@/store/use-portfolio-store'
import { guestbookTranslations } from '@/components/shared/section/section-translations'

/**
 * Hook para criar uma nova mensagem.
 */
export function useCreateMessage() {
  const queryClient = useQueryClient()
  const language = usePortfolioStore((s) => s.language)
  const t = guestbookTranslations[language]

  return useMutation({
    mutationFn: ({ content, userId }: { content: string; userId: string }) =>
      guestbookService.createMessage(content, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] })
      toast.success(t.toastSigned)
    },
    onError: (error: { message: string }) =>
      toast.error(error?.message ?? t.toastError),
  })
}

/**
 * Hook para atualizar uma mensagem (edição).
 */
export function useUpdateMessage() {
  const queryClient = useQueryClient()
  const language = usePortfolioStore((s) => s.language)
  const t = guestbookTranslations[language]

  return useMutation({
    mutationFn: ({ id, content }: { id: number; content: string }) =>
      guestbookService.updateMessage(id, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] })
      toast.success(t.toastUpdated)
    },
    onError: (error: { message: string }) =>
      toast.error(error?.message ?? t.toastError),
  })
}

/**
 * Hook para deletar uma mensagem.
 */
export function useDeleteMessage() {
  const queryClient = useQueryClient()
  const language = usePortfolioStore((s) => s.language)
  const t = guestbookTranslations[language]

  return useMutation({
    mutationFn: (id: number) => guestbookService.deleteMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] })
      toast.success(t.toastDeleted)
    },
    onError: (error: { message: string }) =>
      toast.error(error?.message ?? t.toastError),
  })
}
