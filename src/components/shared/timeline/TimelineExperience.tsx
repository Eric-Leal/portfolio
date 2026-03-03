'use client'

import { usePortfolioStore } from '@/store/use-portfolio-store'
import { experienceSectionTranslations } from '@/components/shared/section/section-translations'
import type { Experience } from '@/types/experience'
import {
  Timeline as AceternityTimeline,
  type TimelineEntry,
} from '@/components/ui/timeline'
import { TimelineCard } from './TimelineCard'

/**
 * Componente que exibe a timeline de experiências.
 */
export function TimelineExperience() {
  const { language } = usePortfolioStore()
  const items: Experience[] =
    experienceSectionTranslations[language]?.items ?? []

  const data: TimelineEntry[] = items.map((item) => ({
    title: item.year,
    content: <TimelineCard item={item} />,
  }))

  return <AceternityTimeline data={data} />
}
