/**
 * Card de uma entrada da timeline. Exibe ano, cargo, empresa e descrição
 * com animação de entrada via Framer Motion baseada no alinhamento (left/right).
 */

'use client'

import { motion } from 'framer-motion'
import type { Experience } from '@/types/experience'

type Props = {
  item: Experience
  align: 'left' | 'right'
  index: number
}

export function TimelineCard({ item, align, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === 'left' ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
      className={`w-full ${align === 'left' ? 'text-right' : 'text-left'}`}
    >
      <div className="bg-card border-border inline-block w-full max-w-sm rounded-2xl border p-5 shadow-sm transition-colors duration-300 lg:max-w-full">
        <p className="text-accent-3 font-title mb-1 text-2xl font-bold italic">
          {item.year}
        </p>
        <h3 className="text-tx-primary mb-0.5 text-lg font-bold">
          {item.role}
        </h3>
        <p className="text-accent-5 mb-3 text-sm font-medium">{item.company}</p>
        <p className="text-tx-muted text-sm leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}
