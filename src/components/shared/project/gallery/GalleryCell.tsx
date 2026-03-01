/**
 * Componente puro de célula da galeria.
 * Renderiza uma imagem ou vídeo clicável com efeito hover,
 * exibindo um ícone de play sobre vídeos como indicador visual.
 */
'use client'

import { PlayCircle } from 'lucide-react'
import type { RefCallback } from 'react'
import type { GalleryItem } from '@/types/project'

export interface GalleryCellProps {
  item: GalleryItem
  index: number
  videoRef: RefCallback<HTMLVideoElement>
  onClick: () => void
}

export function GalleryCell({
  item,
  index,
  videoRef,
  onClick,
}: GalleryCellProps) {
  return (
    <button
      onClick={onClick}
      className="group border-border/40 focus-visible:ring-ring relative h-full w-full overflow-hidden rounded-xl border focus:outline-none focus-visible:ring-2"
      aria-label={item.alt ?? `Abrir item da galeria ${index + 1}`}
    >
      {item.type === 'image' ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.url}
          alt={item.alt ?? ''}
          className="h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
          loading="lazy"
          draggable={false}
        />
      ) : (
        <>
          <video
            ref={videoRef}
            src={item.url}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            className="h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
          />
          <span className="pointer-events-none absolute right-3 bottom-3 rounded-full bg-black/50 p-1 text-white opacity-70 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <PlayCircle size={20} />
          </span>
        </>
      )}
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
    </button>
  )
}
