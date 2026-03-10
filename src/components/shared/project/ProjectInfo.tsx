import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import type { Project } from '@/types/project'
import type { Language } from '@/constants/navigation'
import { BRAND_TAG_CLASSES } from '@/styles/constants'

function TagList({
  tags,
  scrollable,
}: {
  tags: string[]
  scrollable: boolean
}) {
  return (
    <div
      className={cn(
        'flex gap-2',
        scrollable ? 'overflow-x-auto pb-1' : 'flex-wrap',
      )}
      style={
        scrollable
          ? { scrollbarWidth: 'none', msOverflowStyle: 'none' }
          : undefined
      }
    >
      {tags.map((tag, i) => (
        <Badge
          key={tag}
          variant="outline"
          className={cn(
            'shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-opacity hover:opacity-80',
            BRAND_TAG_CLASSES[i % BRAND_TAG_CLASSES.length],
          )}
        >
          {tag}
        </Badge>
      ))}
    </div>
  )
}

export interface ProjectInfoProps {
  project: Project
  /** Idioma ativo, fornecido pelo orquestrador. */
  language: Language
  /** Ativa rolagem horizontal nas tags. @default false */
  tagScrollable?: boolean
  /** Exibe a descrição inline abaixo das tags. @default true */
  showDescription?: boolean
}

/**
 * Painel superior do projeto: título localizado, tags e (opcionalmente) descrição localizada.
 */
export function ProjectInfo({
  project,
  language,
  tagScrollable = false,
  showDescription = true,
}: ProjectInfoProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-tx-primary font-title text-5xl leading-tight font-bold italic md:text-6xl lg:text-7xl">
        {project.title[language]}
      </h1>

      <TagList tags={project.tags} scrollable={tagScrollable} />

      {showDescription && (
        <p
          className="text-tx-secondary [&_b]:text-tx-primary text-md font-sans leading-relaxed md:text-base lg:text-lg [&_b]:font-semibold"
          dangerouslySetInnerHTML={{ __html: project.description[language] }}
        />
      )}
    </div>
  )
}
