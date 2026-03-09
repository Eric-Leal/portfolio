'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Pin, Heart, Pencil, Trash2, Check, X } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR, enUS } from 'date-fns/locale'

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

  const timeAgo = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: language === 'pt' ? ptBR : enUS,
  })

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
        'group relative flex flex-col gap-4 overflow-hidden rounded-2xl border bg-[#0a0a0a] p-5 transition-shadow duration-300',
        pinned
          ? 'border-accent-2/60 shadow-[0_0_0_1px_var(--color-accent-2),0_0_18px_0_color-mix(in_srgb,var(--color-accent-2)_25%,transparent)]'
          : 'border-white/5 hover:border-white/10 hover:shadow-[0_4px_24px_0_rgba(0,0,0,0.4)]',
      )}
    >
      {pinned && (
        <span className="text-accent-2 absolute top-3 right-3 flex items-center gap-1 text-xs font-medium tracking-wide">
          <Pin className="size-3 fill-current" />
          {t.pinned}
        </span>
      )}

      <div className="flex items-start gap-3">
        <Avatar size="default">
          {profileImage && <AvatarImage src={profileImage} alt={displayName} />}
          <AvatarFallback className="text-tx-muted bg-white/5 text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-tx-primary truncate text-sm leading-tight font-semibold">
            {displayName}
          </span>
          <span className="text-tx-secondary text-xs tracking-widest uppercase">
            {timeAgo}
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
            className="text-tx-primary resize-none border-white/10 bg-white/5 text-sm"
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
          <Separator className="bg-white/5" />
          <div className="flex items-center gap-1.5 text-xs font-medium text-pink-400">
            <Heart className="size-3.5 fill-current" />
            {t.likedBy(OWNER_NAME)}
          </div>
        </>
      )}
    </motion.div>
  )
}
