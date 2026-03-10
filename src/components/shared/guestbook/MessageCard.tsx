'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Pin, Heart, Pencil, Trash2 } from 'lucide-react'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { usePortfolioStore } from '@/store/use-portfolio-store'
import { guestbookTranslations } from '@/components/shared/section/section-translations'
import { EditMessageModal } from './EditMessageModal'
import { DeleteMessageModal } from './DeleteMessageModal'

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
  isActive?: boolean
  onActivate?: () => void
}

/**
 * Card somente leitura de uma mensagem do Guestbook.
 * Ações de edição e exclusão abrem modais externos para manter o card limpo.
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
  isActive,
  onActivate,
}: MessageCardProps) {
  const { language } = usePortfolioStore()
  const t = guestbookTranslations[language]

  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const isOwner = currentUserId === guestId
  const displayName = name ?? 'Anonymous'
  const initials = displayName.slice(0, 2).toUpperCase()
  const timeLabel = formatMessageTime(createdAt, language)

  const handleCardClick = () => {
    if (isOwner && onActivate) {
      onActivate()
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        whileHover={{ y: -3, transition: { duration: 0.18 } }}
        whileTap={{ scale: 0.98 }}
        onClick={handleCardClick}
        className={cn(
          'group bg-card relative flex cursor-pointer flex-col gap-4 overflow-hidden rounded-2xl border p-5 transition-all duration-300 select-none',
          pinned
            ? 'border-brand-5/30 dark:border-brand-5/50'
            : 'border-border hover:shadow-[0_4px_24px_0_rgba(0,0,0,0.15)]',

          isActive && 'border-brand-5/60 ring-brand-5/20 ring-1',
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
          <Avatar className="h-10 w-10">
            {profileImage && (
              <AvatarImage src={profileImage} alt={displayName} />
            )}
            <AvatarFallback className="text-tx-muted bg-foreground/5 text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-tx-primary truncate text-sm leading-tight font-semibold">
              {displayName}
            </span>
            <span className="text-tx-secondary text-[10px] tracking-widest uppercase">
              {timeLabel}
            </span>
          </div>

          {isOwner && (
            <div
              className={cn(
                'flex items-center gap-1 transition-all duration-200',
                'md:opacity-0 md:group-hover:opacity-100',
                isActive
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-2 opacity-0 md:translate-x-0',
              )}
            >
              <Button
                variant="ghost"
                size="sm"
                className="text-tx-muted hover:text-accent-5 hover:bg-primary/10 h-8 w-8 p-0"
                onClick={(e) => {
                  e.stopPropagation()
                  setEditOpen(true)
                }}
                aria-label={t.editButton}
              >
                <Pencil className="size-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-tx-muted h-8 w-8 p-0 hover:bg-red-400/10 hover:text-red-400"
                onClick={(e) => {
                  e.stopPropagation()
                  setDeleteOpen(true)
                }}
                aria-label={t.deleteButton}
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          )}
        </div>

        <p className="text-tx-muted text-sm leading-relaxed wrap-break-word">
          {content}
        </p>

        {liked && (
          <div className="mt-auto">
            <Separator className="bg-foreground/25 origin-top scale-y-50" />
            <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-pink-400">
              <Heart className="size-3.5 fill-current" />
              {t.likedBy(OWNER_NAME)}
            </div>
          </div>
        )}
      </motion.div>

      <EditMessageModal
        open={editOpen}
        onOpenChange={setEditOpen}
        messageId={id}
        currentContent={content}
      />
      <DeleteMessageModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        messageId={id}
      />
    </>
  )
}
