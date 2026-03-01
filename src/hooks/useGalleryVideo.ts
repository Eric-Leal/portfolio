/**
 * Hook responsável por conectar os elementos de vídeo da galeria ao GSAP ScrollTrigger,
 * garantindo reprodução automática apenas quando visíveis no viewport.
 *
 * Utiliza `requestAnimationFrame` para aguardar o paint completo do Bento Grid antes
 * de registrar os triggers, evitando o cálculo incorreto de posição causado por
 * dimensões zero durante a primeira renderização.
 */
'use client'

import { useRef, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { GalleryItem } from '@/types/project'

gsap.registerPlugin(ScrollTrigger)

export function useGalleryVideo(gallery: GalleryItem[]) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const makeVideoRef = useCallback(
    (index: number) => (videoEl: HTMLVideoElement | null) => {
      videoRefs.current[index] = videoEl
    },
    [],
  )

  useEffect(() => {
    const pendingTriggers: ReturnType<typeof ScrollTrigger.create>[] = []

    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh()

      gallery.forEach((item, index) => {
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
    })

    return () => {
      cancelAnimationFrame(rafId)
      pendingTriggers.forEach((trigger) => trigger.kill())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { makeVideoRef }
}
