'use client'

import { ReactLenis, type LenisRef } from 'lenis/react'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    const lenis = lenisRef.current?.lenis

    // Integração GSAP exatamente como mostra a documentação oficial
    function update(time: number) {
      lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    // Sincroniza Lenis com ScrollTrigger
    lenis?.on('scroll', ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(update)
      lenis?.off('scroll', ScrollTrigger.update)
    }
  }, [])

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      {children}
    </ReactLenis>
  )
}
