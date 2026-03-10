'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { usePortfolioStore } from '@/store/use-portfolio-store'
import { guestbookTranslations } from '@/components/shared/section/section-translations'
import { useMessages } from '@/hooks'
import { MessageCard } from './MessageCard'
import { MessageSkeleton } from './MessageSkeleton'

export interface MessageListProps {
  currentUserId: string | null
}

/**
 * Lista paginada de mensagens do Guestbook com suporte a "Load more" (infinite
 * scroll manual). Exibe skeletons durante o carregamento inicial e integra os
 * dados diretamente do hook `useMessages` baseado em `useInfiniteQuery`.
 */
export function MessageList({ currentUserId }: MessageListProps) {
  const { language } = usePortfolioStore()
  const t = guestbookTranslations[language]

  const [activeMessageId, setActiveMessageId] = useState<number | null>(null)

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useMessages()

  const messages = data?.pages.flatMap((page) => page) ?? []

  return (
    <div className="flex w-full flex-col gap-6">
      {messages.length > 0 && (
        <div className="flex items-center gap-4">
          <div className="bg-foreground/20 h-px flex-1" />
          <span className="text-tx-secondary text-xs font-medium tracking-[0.2em]">
            {t.recentSignatures}
          </span>
          <div className="bg-foreground/20 h-px flex-1" />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <MessageSkeleton key={i} />)
          : null}

        <AnimatePresence mode="popLayout">
          {messages.map((msg) => {
            const guests = msg.guests as {
              name: string | null
              profile_image: string | null
            } | null

            return (
              <MessageCard
                key={msg.id}
                id={msg.id}
                content={msg.content}
                createdAt={msg.created_at}
                guestId={msg.guest_id}
                name={guests?.name ?? null}
                profileImage={guests?.profile_image ?? null}
                pinned={msg.pinned}
                liked={msg.liked}
                currentUserId={currentUserId}
                isActive={activeMessageId === msg.id}
                onActivate={() =>
                  setActiveMessageId(msg.id === activeMessageId ? null : msg.id)
                }
              />
            )
          })}
        </AnimatePresence>
      </div>

      {hasNextPage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center pt-2"
        >
          <Button
            variant="outline"
            size="sm"
            className="h-10 min-w-36 gap-2 rounded-full"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {t.loading}
              </>
            ) : (
              t.loadMore
            )}
          </Button>
        </motion.div>
      )}
    </div>
  )
}
