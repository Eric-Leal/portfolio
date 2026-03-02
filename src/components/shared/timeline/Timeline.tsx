'use client'

/**
 * Componente principal da timeline profissional. Renderiza uma lista de
 * experiências com scroll animado, linha de progresso e ponto de brilho.
 */

import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { usePortfolioStore } from '@/store/use-portfolio-store'
import { experienceSectionTranslations } from '@/components/section/section-translations'
import type { Experience } from '@/types/experience'
import { TimelineIcon } from './TimelineIcon'
import { TimelineCard } from './TimelineCard'

export function Timeline() {
  const { language } = usePortfolioStore()
  const items: Experience[] =
    experienceSectionTranslations[language]?.items ?? []

  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 15%'],
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  })

  const glowTop = useTransform(scaleY, (v) => `${v * 100}%`)

  return (
    <div ref={containerRef} className="relative w-full py-4">
      <div
        aria-hidden
        className="bg-border/60 absolute top-0 bottom-0 left-4.5 w-px transition-colors duration-300 lg:left-[calc(50%-0.5px)]"
      />

      <motion.div
        aria-hidden
        style={{ scaleY }}
        className="from-brand-3 via-brand-4 to-brand-5 absolute top-0 bottom-0 left-4.5 w-px origin-top bg-linear-to-b lg:left-[calc(50%-0.5px)]"
      />

      <motion.div
        aria-hidden
        style={{
          top: glowTop,
          boxShadow: '0 0 10px 8px var(--color-brand-5)',
        }}
        className="bg-accent-5 pointer-events-none absolute left-4.5 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full lg:left-1/2"
      />

      <div className="relative flex flex-col gap-16">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0

          return (
            <div
              key={`${item.year}-${index}`}
              className="relative flex items-start"
            >
              <div className="hidden w-full lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8">
                <div className="flex justify-end">
                  {isLeft ? (
                    <TimelineCard item={item} align="left" index={index} />
                  ) : (
                    <div />
                  )}
                </div>

                <TimelineIcon category={item.category} />

                <div className="flex justify-start">
                  {!isLeft ? (
                    <TimelineCard item={item} align="right" index={index} />
                  ) : (
                    <div />
                  )}
                </div>
              </div>

              <div className="flex w-full items-start gap-4 lg:hidden">
                <div className="z-10 shrink-0 pt-4">
                  <TimelineIcon category={item.category} />
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.05,
                    ease: 'easeOut',
                  }}
                  className="min-w-0 flex-1"
                >
                  <div className="bg-card border-border rounded-2xl border p-4 shadow-sm transition-colors duration-300">
                    <p className="text-accent-3 font-title mb-1 text-xl font-bold italic">
                      {item.year}
                    </p>
                    <h3 className="text-tx-primary mb-0.5 text-base font-bold">
                      {item.role}
                    </h3>
                    <p className="text-accent-5 mb-2 text-xs font-medium">
                      {item.company}
                    </p>
                    <p className="text-tx-muted text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
