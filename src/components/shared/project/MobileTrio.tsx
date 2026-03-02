'use client'

import { motion } from 'framer-motion'
import type { RefObject } from 'react'
import { Iphone } from '@/components/ui/iphone'
import type { MobileHeroMedia } from '@/types/project'
import { resolveIphoneProps } from '@/lib/utils/project-logic'

function slideIn(delay: number) {
  return {
    duration: 0.6,
    ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    delay,
  }
}

type VideoRefCallback = (videoElement: HTMLVideoElement | null) => void
type MakeVideoRefFunction = (videoIndex: number) => VideoRefCallback

export interface MobileTrioProps {
  devices: MobileHeroMedia['devices']
  containerRef?: RefObject<HTMLDivElement | null>
  makeVideoRef?: MakeVideoRefFunction
}

/**
 * Trio de iPhones sobrepostos com animação de entrada escalonada via Framer Motion.
 * Utilizado como hero de projetos mobile que expõem múltiplas telas simultâneas.
 */
export function MobileTrio({
  devices,
  containerRef,
  makeVideoRef,
}: MobileTrioProps) {
  const [front, leftBack, rightBack] = devices

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full"
      style={{ paddingBottom: '95%' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={slideIn(0.2)}
        className="absolute left-0 z-10 w-[38%]"
        style={{
          top: '8%',
          transform: 'scale(0.85)',
          transformOrigin: 'bottom center',
        }}
      >
        <Iphone
          {...resolveIphoneProps(leftBack)}
          className="[&_path]:fill-foreground"
          videoRef={makeVideoRef ? makeVideoRef(0) : undefined}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={slideIn(0.3)}
        className="absolute right-0 z-10 w-[38%]"
        style={{
          top: '8%',
          transform: 'scale(0.85)',
          transformOrigin: 'bottom center',
        }}
      >
        <Iphone
          {...resolveIphoneProps(rightBack)}
          className="[&_path]:fill-foreground"
          videoRef={makeVideoRef ? makeVideoRef(1) : undefined}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={slideIn(0)}
        className="absolute top-0 left-1/2 z-20 w-[46%] -translate-x-1/2"
      >
        <Iphone
          {...resolveIphoneProps(front)}
          className="[&_path]:fill-foreground"
          videoRef={makeVideoRef ? makeVideoRef(2) : undefined}
        />
      </motion.div>
    </div>
  )
}
