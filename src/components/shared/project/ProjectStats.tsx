import type { ProjectStat } from '@/types/project'
import type { Language } from '@/constants/navigation'

export interface ProjectStatsProps {
  stats: ProjectStat[]
  /** Idioma ativo, fornecido pelo orquestrador. */
  language: Language
}

/**
 * Grade de estatísticas com título e valor, responsiva ao idioma.
 */
export function ProjectStats({ stats, language }: ProjectStatsProps) {
  if (stats.length === 0) return null

  return (
    <div className="border-border flex justify-center gap-16 border-t py-6 md:justify-start md:gap-12 md:py-0 md:pt-6">
      {stats.map((stat) => (
        <div
          key={stat.label[language]}
          className="flex flex-col items-center gap-0.5"
        >
          <span className="text-primary font-title text-5xl font-bold italic md:text-4xl">
            {stat.value}
          </span>
          <span className="text-tx-secondary font-sans text-xs tracking-widest uppercase">
            {stat.label[language]}
          </span>
        </div>
      ))}
    </div>
  )
}
