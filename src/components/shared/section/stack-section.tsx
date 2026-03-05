'use client'

import type { IconType } from 'react-icons'
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiSpringboot,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiDocker,
  SiPostgresql,
  SiMongodb,
  // SiAmazonwebservices,
  SiGit,
  SiGraphql,
  SiTailwindcss,
  SiRedis,
  SiJest,
  SiLinux,
  SiTerraform,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import { ContentSection } from '@/components/shared/section/content-section'
import { stackSectionTranslations } from '@/components/shared/section/section-translations'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TechItem {
  id: number
  name: string
  icon?: IconType
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const techStack: TechItem[] = [
  { id: 1, name: 'JavaScript', icon: SiJavascript },
  { id: 2, name: 'TypeScript', icon: SiTypescript },
  { id: 3, name: 'React', icon: SiReact },
  { id: 4, name: 'Spring Boot', icon: SiSpringboot },
  { id: 5, name: 'Next.js', icon: SiNextdotjs },
  { id: 6, name: 'Node.js', icon: SiNodedotjs },
  { id: 7, name: 'Python', icon: SiPython },
  { id: 8, name: 'Java', icon: FaJava },
  { id: 9, name: 'Docker', icon: SiDocker },
  { id: 10, name: 'PostgreSQL', icon: SiPostgresql },
  { id: 11, name: 'MongoDB', icon: SiMongodb },
  // { id: 12, name: 'AWS',         icon: SiAmazonwebservices },
  { id: 13, name: 'Git', icon: SiGit },
  { id: 14, name: 'GraphQL', icon: SiGraphql },
  { id: 15, name: 'Tailwind CSS', icon: SiTailwindcss },
  { id: 16, name: 'Redis', icon: SiRedis },
  //{ id: 17, name: 'REST APIs'                              },
  { id: 18, name: 'Jest', icon: SiJest },
  { id: 19, name: 'Linux', icon: SiLinux },
  { id: 20, name: 'Terraform', icon: SiTerraform },
]

// ─── Sub-component ────────────────────────────────────────────────────────────

function TechPill({ item }: { item: TechItem }) {
  const Icon = item.icon

  return (
    <div className="border-border bg-card text-tx-secondary hover:border-brand-5/40 hover:text-tx-primary flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors">
      {Icon ? (
        <Icon size={16} className="shrink-0" />
      ) : (
        <span className="text-tx-muted shrink-0 text-xs font-bold">
          &lt;/&gt;
        </span>
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
      textOrientation="center"
    >
      <div className="flex flex-wrap justify-center gap-3">
        {techStack.map((item) => (
          <TechPill key={item.id} item={item} />
        ))}
      </div>
    </ContentSection>
  )
}
