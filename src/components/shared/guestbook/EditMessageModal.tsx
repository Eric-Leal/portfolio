'use client'

import { useState } from 'react'
import { Save } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { usePortfolioStore } from '@/store/use-portfolio-store'
import { guestbookTranslations } from '@/components/shared/section/section-translations'
import { useUpdateMessage } from '@/hooks'

export interface EditMessageModalProps {
  open: boolean
  onOpenChange: (_open: boolean) => void
  messageId: number
  currentContent: string
}

/**
 * Modal de edição de mensagem do Guestbook.
 * Recebe o conteúdo atual, permite edição inline e chama `useUpdateMessage` ao salvar.
 */
export function EditMessageModal({
  open,
  onOpenChange,
  messageId,
  currentContent,
}: EditMessageModalProps) {
  const { language } = usePortfolioStore()
  const t = guestbookTranslations[language]

  const [value, setValue] = useState(currentContent)
  const { mutate: updateMessage, isPending } = useUpdateMessage()

  function handleSave() {
    const trimmed = value.trim()
    if (!trimmed || trimmed === currentContent) {
      onOpenChange(false)
      return
    }
    updateMessage(
      { id: messageId, content: trimmed },
      { onSuccess: () => onOpenChange(false) },
    )
  }

  function handleOpenChange(next: boolean) {
    if (!next) setValue(currentContent)
    onOpenChange(next)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-tx-primary text-lg font-semibold">
            {t.editModalTitle}
          </DialogTitle>
        </DialogHeader>

        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={500}
          rows={5}
          autoFocus
          className="text-tx-primary placeholder:text-tx-secondary border-border focus-visible:ring-ring resize-none bg-transparent text-sm leading-relaxed"
        />

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="ghost"
            className="text-tx-secondary hover:text-tx-primary"
            onClick={() => handleOpenChange(false)}
            disabled={isPending}
          >
            {t.cancelButton}
          </Button>
          <Button
            className="gap-2 rounded-full"
            onClick={handleSave}
            disabled={isPending || !value.trim()}
          >
            <Save className="size-3.5" />
            {t.saveButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
