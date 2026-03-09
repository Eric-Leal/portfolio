'use client'

import { TriangleAlert } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { usePortfolioStore } from '@/store/use-portfolio-store'
import { guestbookTranslations } from '@/components/shared/section/section-translations'
import { useDeleteMessage } from '@/hooks'

export interface DeleteMessageModalProps {
  open: boolean
  onOpenChange: (_open: boolean) => void
  messageId: number
}

/**
 * Modal de confirmação de exclusão de mensagem do Guestbook.
 * Exibe aviso de ação irreversível e chama `useDeleteMessage` ao confirmar.
 */
export function DeleteMessageModal({
  open,
  onOpenChange,
  messageId,
}: DeleteMessageModalProps) {
  const { language } = usePortfolioStore()
  const t = guestbookTranslations[language]

  const { mutate: deleteMessage, isPending } = useDeleteMessage()

  function handleConfirm() {
    deleteMessage(messageId, { onSuccess: () => onOpenChange(false) })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-card border-border text-center sm:max-w-sm"
        showCloseButton={false}
      >
        <DialogHeader className="items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-red-500/10">
            <TriangleAlert className="size-6 text-red-500" />
          </div>
          <DialogTitle className="text-tx-primary text-lg font-semibold">
            {t.deleteModalTitle}
          </DialogTitle>
          <p className="text-tx-secondary text-sm leading-relaxed">
            {t.deleteModalDescription}
          </p>
        </DialogHeader>

        <DialogFooter className="flex-row justify-center gap-3 sm:justify-center">
          <Button
            variant="ghost"
            className="text-tx-secondary hover:text-tx-primary"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            {t.cancelButton}
          </Button>
          <Button
            className="gap-2 rounded-full bg-red-600 text-white hover:bg-red-700"
            onClick={handleConfirm}
            disabled={isPending}
          >
            {t.confirmDeleteButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
