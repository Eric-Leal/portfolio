/**
 * Modal de Lightbox para exibição de mídias da galeria em tela cheia.
 * Suporta navegação entre itens (quando houver mais de um) e controle por teclado
 */
'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { GalleryItem } from '@/types/project'

export interface GalleryLightboxProps {
  items: GalleryItem[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function GalleryLightbox({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps) {
  const activeItem = items[currentIndex]
  const hasMultipleItems = items.length > 1

  useEffect(() => {
    const savedOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = savedOverflow
    }
  }, [])

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrev()
      if (event.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose, onPrev, onNext])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="lightbox-backdrop"
        role="dialog"
        aria-modal="true"
        aria-label="Lightbox de mídia"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative flex h-full max-h-[90dvh] w-full max-w-5xl items-center justify-center px-16 py-10"
          onClick={(e) => e.stopPropagation()}
        >
          {activeItem.type === 'image' ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={activeItem.url}
              alt={activeItem.alt ?? ''}
              className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
              draggable={false}
            />
          ) : (
            <video
              src={activeItem.url}
              autoPlay
              muted
              loop
              controls
              playsInline
              className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
            />
          )}
        </motion.div>

        <button
          onClick={onClose}
          className="border-border/50 bg-background/80 text-tx-primary hover:bg-background absolute top-4 right-4 rounded-full border p-2 backdrop-blur-sm transition-colors"
          aria-label="Fechar lightbox"
        >
          <X size={20} />
        </button>

        {hasMultipleItems && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            className="border-border/50 bg-background/80 text-tx-primary hover:bg-background absolute top-1/2 left-3 -translate-y-1/2 rounded-full border p-3 backdrop-blur-sm transition-colors"
            aria-label="Item anterior"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {hasMultipleItems && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="border-border/50 bg-background/80 text-tx-primary hover:bg-background absolute top-1/2 right-3 -translate-y-1/2 rounded-full border p-3 backdrop-blur-sm transition-colors"
            aria-label="Próximo item"
          >
            <ChevronRight size={22} />
          </button>
        )}

        {hasMultipleItems && (
          <div className="absolute bottom-4 flex items-center gap-2">
            {items.map((_, dotIndex) => (
              <div
                key={dotIndex}
                className={cn(
                  'rounded-full bg-white transition-all duration-300',
                  dotIndex === currentIndex
                    ? 'h-1.5 w-6'
                    : 'h-1.5 w-1.5 opacity-40',
                )}
              />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>,
    document.body,
  )
}
