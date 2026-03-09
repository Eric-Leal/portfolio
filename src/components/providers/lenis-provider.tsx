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
    // Integração GSAP: sempre referencie o ref dentro do RAF/update
    // para que a instância Lenis seja lida no momento da execução
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    // Sincroniza Lenis com ScrollTrigger — registre quando disponível
    const maybeLenis = () => lenisRef.current?.lenis
    maybeLenis()?.on('scroll', ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(update)
      maybeLenis()?.off('scroll', ScrollTrigger.update)
    }
  }, [])

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      {children}
    </ReactLenis>
  )
}
