'use client'

import { Tech, techStack } from '@/constants/stacks'
import { Icon } from '@iconify/react'

function TechItem({ item }: { item: Tech }) {
  return (
    <div className="border-border bg-card text-tx-secondary hover:border-brand-5/40 hover:text-tx-primary flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors">
      <Icon icon={item.icon} width={16} height={16} className="shrink-0" />
      <span>{item.name}</span>
    </div>
  )
}

export function TechStack() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {techStack.map((item) => (
        <TechItem key={item.id} item={item} />
      ))}
    </div>
  )
}
