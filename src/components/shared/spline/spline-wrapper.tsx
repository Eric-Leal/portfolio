'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SplineWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        onLeave: () => {
          gsap.set(containerRef.current, { display: 'none' })
        },
        onEnterBack: () => {
          gsap.set(containerRef.current, { display: 'block' })
        },
      })
    })
    return () => ctx.revert()
  }, [])

  // Em dispositivos touch (qualquer tamanho de tela): delega scroll ao browser via
  // touch-action pan-y e encaminha eventos de posição ao Spline para manter animações.
  // Em dispositivos sem touch: overlay fica com pointer-events none e o mouse chega direto ao Spline.
  useEffect(() => {
    const overlay = overlayRef.current
    const container = containerRef.current
    if (!overlay || !container) return

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (!isTouch) {
      overlay.style.pointerEvents = 'none'
      return
    }

    overlay.style.pointerEvents = 'auto'

    let startY = 0
    let startX = 0
    const TAP_THRESHOLD = 10

    const getCanvas = () => container.querySelector('canvas')

    const dispatchToCanvas = (type: string, x: number, y: number) => {
      getCanvas()?.dispatchEvent(
        new PointerEvent(type, {
          bubbles: false,
          cancelable: false,
          clientX: x,
          clientY: y,
          pointerId: 1,
          pointerType: 'touch',
        }),
      )
    }

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY
      startX = e.touches[0].clientX
      dispatchToCanvas('pointerdown', startX, startY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      dispatchToCanvas('pointermove', t.clientX, t.clientY)
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0]
      const movedY = Math.abs(startY - t.clientY)
      const movedX = Math.abs(startX - t.clientX)

      dispatchToCanvas('pointerup', t.clientX, t.clientY)

      if (movedY < TAP_THRESHOLD && movedX < TAP_THRESHOLD) {
        getCanvas()?.dispatchEvent(
          new MouseEvent('click', {
            bubbles: false,
            cancelable: true,
            clientX: t.clientX,
            clientY: t.clientY,
          }),
        )
      }
    }

    overlay.addEventListener('touchstart', handleTouchStart, { passive: true })
    overlay.addEventListener('touchmove', handleTouchMove, { passive: true })
    overlay.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      overlay.removeEventListener('touchstart', handleTouchStart)
      overlay.removeEventListener('touchmove', handleTouchMove)
      overlay.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full will-change-transform"
    >
      {children}
      {/* Overlay presente em todos os tamanhos — pointer-events controlado por JS.
          Em touch: intercepta toques (pointer-events auto, touch-action pan-y).
          Em mouse: pointer-events none, o cursor chega direto ao canvas do Spline. */}
      <div ref={overlayRef} className="absolute inset-0 z-10 touch-pan-y" />
    </div>
  )
}
