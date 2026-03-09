'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { SendHorizonal } from 'lucide-react'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { MagicCard } from '@/components/ui/magic-card'
import { usePortfolioStore } from '@/store/use-portfolio-store'
import { guestbookTranslations } from '@/components/shared/section/section-translations'
import { useCreateMessage } from '@/hooks'

const MAX_CHARS = 500

export interface GuestbookInputProps {
  userId: string
  avatarUrl?: string
  displayName?: string
  ownerName: string
}

/**
 * Caixa de comentário premium para o Guestbook. Exibe o avatar do usuário logado,
 * um textarea expansível com contador de caracteres em tempo real e integra com
 * o hook `useCreateMessage`.
 */
export function GuestbookInput({
  userId,
  avatarUrl,
  displayName,
  ownerName,
}: GuestbookInputProps) {
  const { language } = usePortfolioStore()
  const t = guestbookTranslations[language]

  const [content, setContent] = useState('')
  const { mutate: createMessage, isPending } = useCreateMessage()

  const initials = displayName?.slice(0, 2).toUpperCase() ?? 'A'
  const charsLeft = content.length

  function handleSubmit() {
    if (!content.trim() || isPending) return
    createMessage(
      { content: content.trim(), userId },
      { onSuccess: () => setContent('') },
    )
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit()
    }
  }

  return (
    <MagicCard
      className="bg-card w-full rounded-2xl"
      gradientColor="var(--color-brand-5)"
      gradientOpacity={0.15}
      gradientFrom="var(--color-brand-2)"
      gradientTo="var(--color-brand-5)"
    >
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-start gap-3">
          <Avatar size="default">
            {avatarUrl && (
              <AvatarImage src={avatarUrl} alt={displayName ?? 'User'} />
            )}
            <AvatarFallback className="text-tx-muted bg-foreground/5 text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={MAX_CHARS}
            placeholder={t.inputPlaceholder(ownerName)}
            rows={2}
            disabled={isPending}
            className="text-tx-primary placeholder:text-tx-secondary text-md flex-1 resize-none border-none bg-transparent p-0 leading-relaxed shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <div className="flex items-center justify-between">
          <motion.span
            key={charsLeft}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            className="text-tx-secondary text-xs tabular-nums"
          >
            {t.charCount(charsLeft, MAX_CHARS)}
          </motion.span>

          <Button
            size="sm"
            className="h-9 gap-2 rounded-full px-5"
            onClick={handleSubmit}
            disabled={isPending || !content.trim()}
          >
            {isPending ? (
              t.signingButton
            ) : (
              <>
                {t.signButton}
                <SendHorizonal className="size-3.5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </MagicCard>
  )
}
