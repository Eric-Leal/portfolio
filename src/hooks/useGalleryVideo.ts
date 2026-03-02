/**
 * Hook responsável por conectar elementos de vídeo ao GSAP ScrollTrigger,
 * garantindo reprodução automática apenas quando visíveis no viewport.
 *
 * Utiliza `requestAnimationFrame` para aguardar o paint completo antes
 * de registrar os triggers, evitando o cálculo incorreto de posição causado por
 * dimensões zero durante a primeira renderização.
 */
'use client'

import { useRef, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { GalleryItem } from '@/types/project'

gsap.registerPlugin(ScrollTrigger)

type VideoItem = GalleryItem | { type: 'video' | 'image' }

export function useGalleryVideo(items: VideoItem[] | number) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement | null>(null)

  const makeVideoRef = useCallback(
    (index: number) => (videoEl: HTMLVideoElement | null) => {
      videoRefs.current[index] = videoEl
    },
    [],
  )

  useEffect(() => {
    const pendingTriggers: ReturnType<typeof ScrollTrigger.create>[] = []
    const itemsArray = Array.isArray(items)
      ? items
      : Array(items).fill({ type: 'video' })

    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh()

      // If we have a container ref, create one trigger for all videos
      if (containerRef.current && typeof items === 'number') {
        const rect = containerRef.current.getBoundingClientRect()
        const isAlreadyVisible =
          rect.top < window.innerHeight && rect.bottom > 0

        if (isAlreadyVisible) {
          videoRefs.current.forEach((v) => v?.play().catch(() => {}))
        }

        const trigger = ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 95%',
          end: 'bottom 5%',
          onEnter: () =>
            videoRefs.current.forEach((v) => v?.play().catch(() => {})),
          onLeave: () => {
            videoRefs.current.forEach((v) => {
              if (v) {
                v.pause()
                v.currentTime = 0
              }
            })
          },
          onEnterBack: () =>
            videoRefs.current.forEach((v) => v?.play().catch(() => {})),
          onLeaveBack: () => {
            videoRefs.current.forEach((v) => {
              if (v) {
                v.pause()
                v.currentTime = 0
              }
            })
          },
        })

        pendingTriggers.push(trigger)
      } else {
        // Individual triggers for each video
        itemsArray.forEach((item, index) => {
          if (item.type !== 'video') return

          const videoEl = videoRefs.current[index]
          if (!videoEl) return

          const rect = videoEl.getBoundingClientRect()
          const isAlreadyVisible =
            rect.top < window.innerHeight && rect.bottom > 0

          if (isAlreadyVisible) {
            videoEl.play().catch(() => {})
          }

          const trigger = ScrollTrigger.create({
            trigger: videoEl,
            start: 'top 95%',
            end: 'bottom 5%',
            onEnter: () => videoEl.play().catch(() => {}),
            onLeave: () => {
              videoEl.pause()
              videoEl.currentTime = 0
            },
            onEnterBack: () => videoEl.play().catch(() => {}),
            onLeaveBack: () => {
              videoEl.pause()
              videoEl.currentTime = 0
            },
          })

          pendingTriggers.push(trigger)
        })
      }
    })

    return () => {
      cancelAnimationFrame(rafId)
      pendingTriggers.forEach((trigger) => trigger.kill())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { makeVideoRef, containerRef }
}
