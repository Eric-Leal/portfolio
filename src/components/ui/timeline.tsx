'use client'

import { useScroll, useTransform, motion } from 'motion/react'
import React, { useEffect, useRef, useState } from 'react'

export interface TimelineEntry {
  title: string
  content: React.ReactNode
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [ref])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div className="w-full font-sans md:px-10" ref={containerRef}>
      <div ref={ref} className="relative mx-auto max-w-7xl pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-12 md:gap-10 md:pt-40"
          >
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="bg-background absolute left-3 flex h-10 w-10 items-center justify-center rounded-full md:left-3">
                <div className="border-border/50 h-4 w-4 rounded-full border bg-(--color-accent-5) p-2" />
              </div>

              {/* Título (Ano) Desktop */}
              <h3 className="font-title text-tx-primary hidden text-xl font-bold md:block md:pl-20 md:text-6xl">
                {item.title}
              </h3>
            </div>

            {/* Conteúdo do Card */}
            <div className="relative w-full pr-4 pl-20 md:pl-4">
              {/* Título (Ano) Mobile */}
              <h3 className="font-title text-tx-primary mb-4 block text-left text-3xl font-bold md:hidden">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* Linha de Progresso (The Beam) */}
        <div
          style={{ height: height + 'px' }}
          className="bg-border/20 absolute top-0 left-8 w-[2px] overflow-hidden md:left-8"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="from-brand-3 via-brand-4 to-brand-5 absolute inset-x-0 top-0 w-full rounded-full bg-linear-to-b will-change-transform"
          />
        </div>
      </div>
    </div>
  )
}
