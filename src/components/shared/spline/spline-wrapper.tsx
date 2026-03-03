'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * SplineWrapper é um componente que envolve o Spline para otimizar a performance.
 * Ele usa GSAP e ScrollTrigger para pausar a renderização visual do Spline quando ele sai da tela,
 * e retomar quando volta. Isso é feito com animações de opacity e scale, evitando o uso de display: none
 */

export function SplineWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Criamos o trigger para pausar a renderização visual quando sair da tela
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

  return (
    <div ref={containerRef} className="h-full w-full will-change-transform">
      {children}
    </div>
  )
}
