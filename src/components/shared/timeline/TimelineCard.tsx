/**
 * Card de uma entrada da timeline.
 * - Exibe ícone de categoria, cargo, empresa e descrição.
 * - O ano não é exibido aqui — ele é o título sticky lateral da timeline.
 * - Animação de entrada via Framer Motion (fade + slide).
 */

'use client'

import { motion } from 'framer-motion'
import type { Experience } from '@/types/experience'
import { TimelineIcon } from './TimelineIcon'
import { cn } from '@/lib/utils'

type Props = {
  item: Experience
}

export function TimelineCard({ item }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="w-full"
    >
      <div
        className={cn(
          'md:bg-card md:border-brand-5/40 rounded-2xl py-5 transition-all duration-500 md:border md:p-5 md:shadow-sm',
        )}
      >
        <div className="mb-3 flex items-center gap-3">
          <TimelineIcon category={item.category} />
          <h3 className="text-tx-primary font-sans text-xl leading-tight font-bold">
            {item.role}
          </h3>
        </div>
        <p className="text-accent-5 mb-3 text-sm font-medium">{item.company}</p>
        <p className="text-tx-muted text-md leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}
