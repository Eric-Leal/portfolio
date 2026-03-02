/**
 * Ícone circular da timeline. Exibe um ícone Lucide baseado na categoria
 * da experiência e aplica a cor correspondente do design system.
 */

import { Briefcase, GraduationCap, Code } from 'lucide-react'
import type { ExperienceCategory } from '@/types/experience'

const CATEGORY_ICON: Record<ExperienceCategory, React.ReactNode> = {
  work: <Briefcase className="h-4 w-4" />,
  education: <GraduationCap className="h-4 w-4" />,
  code: <Code className="h-4 w-4" />,
}

const CATEGORY_COLOR: Record<ExperienceCategory, string> = {
  work: 'bg-brand-3 text-white',
  education: 'bg-brand-5 text-white',
  code: 'bg-brand-2 text-white',
}

type Props = {
  category: ExperienceCategory
}

export function TimelineIcon({ category }: Props) {
  return (
    <div
      className={`z-10 flex h-9 w-9 items-center justify-center rounded-full shadow-lg transition-colors duration-300 ${CATEGORY_COLOR[category]}`}
    >
      {CATEGORY_ICON[category]}
    </div>
  )
}
