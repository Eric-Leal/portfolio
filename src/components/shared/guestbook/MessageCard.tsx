'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Pin, Heart, Pencil, Trash2, Check, X } from 'lucide-react'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { usePortfolioStore } from '@/store/use-portfolio-store'
import { guestbookTranslations } from '@/components/shared/section/section-translations'
import { useUpdateMessage, useDeleteMessage } from '@/hooks'

/** Nome exibido no "Liked by". Altere conforme necessário. */
const OWNER_NAME = 'Laura'

function formatMessageTime(createdAt: string, language: string): string {
  const date = new Date(createdAt)
  const diffMs = Date.now() - date.getTime()

  if (diffMs < 24 * 60 * 60 * 1000) {
    return language === 'pt' ? 'hoje' : 'today'
  }

  const month = date
    .toLocaleString(language === 'pt' ? 'pt-BR' : 'en-US', { month: 'short' })
    .toUpperCase()
    .replace(/\./g, '')
  return `${month} ${date.getDate()} ${date.getFullYear()}`
}

export interface MessageCardProps {
  id: number
  content: string
  createdAt: string
  guestId: string
  name: string | null
  profileImage: string | null
  pinned: boolean
  liked: boolean
  currentUserId: string | null
}

/**
 * Card de exibição de uma mensagem do Guestbook. Suporta estados de pinado e
 * curtido com estilos distintos, edição inline, deleção e reage a hover/toque.
 * O idioma é consumido via Zustand store.
 */
export function MessageCard({
  id,
  content,
  createdAt,
  guestId,
  name,
  profileImage,
  pinned,
  liked,
  currentUserId,
}: MessageCardProps) {
  const { language } = usePortfolioStore()
  const t = guestbookTranslations[language]

  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(content)

  const { mutate: updateMessage, isPending: isUpdating } = useUpdateMessage()
  const { mutate: deleteMessage, isPending: isDeleting } = useDeleteMessage()

  const isOwner = currentUserId === guestId
  const displayName = name ?? 'Anonymous'
  const initials = displayName.slice(0, 2).toUpperCase()

  const timeLabel = formatMessageTime(createdAt, language)

  function handleSave() {
    if (editValue.trim() === content) {
      setIsEditing(false)
      return
    }
    updateMessage(
      { id, content: editValue.trim() },
      { onSuccess: () => setIsEditing(false) },
    )
  }

  function handleCancel() {
    setEditValue(content)
    setIsEditing(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'group bg-card relative flex flex-col gap-4 overflow-hidden rounded-2xl border p-5 transition-shadow duration-300',
        pinned
          ? 'border-brand-5/30 dark:border-brand-5/50'
          : 'border-border hover:border-border hover:shadow-[0_4px_24px_0_rgba(0,0,0,0.4)]',
      )}
    >
      {pinned && (
        <>
          <span className="bg-brand-5 absolute inset-y-0 left-0 w-0.75" />
          <span className="text-brand-5 absolute top-3 right-3 flex items-center gap-1 text-xs font-medium tracking-wide">
            <Pin className="size-3 fill-current" />
            {t.pinned}
          </span>
        </>
      )}

      <div className="flex items-start gap-3">
        <Avatar size="default">
          {profileImage && <AvatarImage src={profileImage} alt={displayName} />}
          <AvatarFallback className="text-tx-muted bg-foreground/5 text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-tx-primary truncate text-sm leading-tight font-semibold">
            {displayName}
          </span>
          <span className="text-tx-secondary text-xs tracking-widest uppercase">
            {timeLabel}
          </span>
        </div>

        {isOwner && !isEditing && (
          <div className="flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <Button
              variant="ghost"
              size="sm"
              className="text-tx-muted hover:text-tx-primary h-7 w-7 p-0"
              onClick={() => setIsEditing(true)}
              aria-label={t.editButton}
            >
              <Pencil className="size-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-tx-muted h-7 w-7 p-0 hover:text-red-400"
              onClick={() => deleteMessage(id)}
              disabled={isDeleting}
              aria-label={t.deleteButton}
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="flex flex-col gap-2">
          <Textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            maxLength={500}
            rows={3}
            className="text-tx-primary border-border bg-foreground/5 resize-none text-sm"
            autoFocus
          />
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-tx-muted hover:text-tx-primary h-7 gap-1.5"
              onClick={handleCancel}
            >
              <X className="size-3.5" />
              {t.cancelButton}
            </Button>
            <Button
              size="sm"
              className="h-7 gap-1.5"
              onClick={handleSave}
              disabled={isUpdating || !editValue.trim()}
            >
              <Check className="size-3.5" />
              {t.saveButton}
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-tx-muted text-sm leading-relaxed wrap-break-word">
          {content}
        </p>
      )}

      {liked && !isEditing && (
        <>
          <Separator className="bg-border" />
          <div className="flex items-center gap-1.5 text-xs font-medium text-pink-400">
            <Heart className="size-3.5 fill-current" />
            {t.likedBy(OWNER_NAME)}
          </div>
        </>
      )}
    </motion.div>
  )
}
