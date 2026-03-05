'use client'

import { Code2 } from 'lucide-react'
import { ContentSection } from '@/components/shared/section/content-section'
import { stackSectionTranslations } from '@/components/shared/section/section-translations'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TechItem {
  id: number
  name: string
  /** Substituir pelo SVG/ícone real quando disponível. */
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const techStack: TechItem[] = [
  { id: 1, name: 'JavaScript' },
  { id: 2, name: 'TypeScript' },
  { id: 3, name: 'React' },
  { id: 4, name: 'Spring Boot' },
  { id: 5, name: 'Next.js' },
  { id: 6, name: 'Node.js' },
  { id: 7, name: 'Python' },
  { id: 8, name: 'Java' },
  { id: 9, name: 'Docker' },
  { id: 10, name: 'PostgreSQL' },
  { id: 11, name: 'MongoDB' },
  { id: 12, name: 'AWS' },
  { id: 13, name: 'Git' },
  { id: 14, name: 'GraphQL' },
  { id: 15, name: 'Tailwind CSS' },
  { id: 16, name: 'Redis' },
  { id: 17, name: 'REST APIs' },
  { id: 18, name: 'Jest' },
  { id: 19, name: 'Linux' },
  { id: 20, name: 'Terraform' },
]

// ─── Sub-component ────────────────────────────────────────────────────────────

function TechPill({ item }: { item: TechItem }) {
  const Icon = item.icon

  return (
    <div className="border-border bg-card text-tx-secondary hover:border-brand-5/40 hover:text-tx-primary flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors">
      {Icon ? (
        <Icon className="h-4 w-4 shrink-0" />
      ) : (
        <Code2 size={14} className="text-tx-muted shrink-0" />
      )}
      <span>{item.name}</span>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function StackSection() {
  return (
    <ContentSection
      translations={stackSectionTranslations}
      sectionSize="large"
      textOrientation="left"
    >
      <div className="flex flex-wrap gap-3">
        {techStack.map((item) => (
          <TechPill key={item.id} item={item} />
        ))}
      </div>
    </ContentSection>
  )
}
