/**
 * Orquestrador da galeria de mídias do projeto.
 */
'use client'

import { useState, useCallback } from 'react'
import { BlurFade } from '@/components/ui/blur-fade'
import { cn } from '@/lib/utils'
import type { GalleryItem } from '@/types/project'
import { GalleryCell } from './GalleryCell'
import { GalleryLightbox } from './GalleryLightbox'
import { useGalleryVideo } from '../../../../hooks/useGalleryVideo'

const BENTO_3_PLACEMENT = [
  'col-start-1 col-span-2 row-start-1 row-span-2',
  'col-start-3 col-span-1 row-start-1 row-span-1',
  'col-start-3 col-span-1 row-start-2 row-span-1',
] as const

const BENTO_4_PLACEMENT = [
  'col-start-1 col-span-2 row-start-1 row-span-2',
  'col-start-3 col-span-1 row-start-1 row-span-1',
  'col-start-1 col-span-2 row-start-3 row-span-1',
  'col-start-3 col-span-1 row-start-2 row-span-2',
] as const

export interface ProjectGalleryProps {
  gallery: GalleryItem[]
}

export function ProjectGallery({ gallery }: ProjectGalleryProps) {
  const itemCount = gallery.length
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const { makeVideoRef } = useGalleryVideo(gallery)

  const openLightbox = useCallback(
    (index: number) => setLightboxIndex(index),
    [],
  )
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const prevItem = useCallback(
    () =>
      setLightboxIndex((current) =>
        current === null ? null : (current - 1 + itemCount) % itemCount,
      ),
    [itemCount],
  )

  const nextItem = useCallback(
    () =>
      setLightboxIndex((current) =>
        current === null ? null : (current + 1) % itemCount,
      ),
    [itemCount],
  )

  const bentoPlacement = itemCount === 3 ? BENTO_3_PLACEMENT : BENTO_4_PLACEMENT
  const desktopGridRows =
    itemCount === 3
      ? 'grid-rows-[240px_240px]'
      : 'grid-rows-[200px_200px_200px]'

  return (
    <>
      <div className={cn('hidden grid-cols-3 gap-3 md:grid', desktopGridRows)}>
        {gallery.map((item, index) => (
          <BlurFade
            key={index}
            delay={0.1 + index * 0.08}
            inView
            inViewMargin="-80px"
            className={cn('h-full', bentoPlacement[index])}
          >
            <GalleryCell
              item={item}
              index={index}
              videoRef={makeVideoRef(index)}
              onClick={() => openLightbox(index)}
            />
          </BlurFade>
        ))}
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        {gallery.map((item, index) => (
          <BlurFade
            key={index}
            delay={0.1 + index * 0.08}
            inView
            inViewMargin="-40px"
          >
            <div className="border-border/40 aspect-video w-full overflow-hidden rounded-xl border">
              <GalleryCell
                item={item}
                index={index}
                videoRef={makeVideoRef(index)}
                onClick={() => openLightbox(index)}
              />
            </div>
          </BlurFade>
        ))}
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          items={gallery}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}
    </>
  )
}
