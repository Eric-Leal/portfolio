/**
 * @file ProjectActions.tsx
 * @descrição Renderiza os botões de ação do projeto adaptados à categoria e ao idioma ativo.
 * Recebe `language` do orquestrador para exibir os rótulos traduzidos.
 * Suporta `fullWidth` para barra fixa mobile e `buttonClassName` para ajuste de tamanho no desktop.
 */

import { cn } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'
import { FaApple, FaGooglePlay } from 'react-icons/fa'
import { LuGithub as Github } from 'react-icons/lu'

import { Button } from '@/components/ui/button'
import type { Project } from '@/types/project'
import { isWebProject, isMobileProject } from '@/lib/utils/project-logic'
import type { Language } from '@/constants/navigation'

const PROJECT_ACTIONS_TRANSLATIONS = {
  pt: {
    visitSite: 'Acessar Site',
    githubRepo: 'Repositório GitHub',
    appStore: 'App Store',
    playStore: 'Play Store',
  },
  en: {
    visitSite: 'Visit Site',
    githubRepo: 'GitHub Repository',
    appStore: 'App Store',
    playStore: 'Play Store',
  },
} as const

export interface ProjectActionsProps {
  project: Project
  /** Idioma ativo, fornecido pelo orquestrador. */
  language: Language
  /** Aplica `w-full` em cada botão — ideal para a barra fixa mobile. */
  fullWidth?: boolean
  /** Classes extras aplicadas a cada botão individualmente. */
  buttonClassName?: string
}

/**
 * Botões de ação externos adaptados à categoria do projeto (web ou mobile).
 */
export function ProjectActions({
  project,
  language,
  fullWidth,
  buttonClassName,
}: ProjectActionsProps) {
  const t = PROJECT_ACTIONS_TRANSLATIONS[language]
  const btnCn = cn(
    'rounded-full h-12 text-base px-5 gap-3',
    'sm:h-10 sm:text-sm sm:px-4',
    fullWidth && 'w-full',
    buttonClassName,
  )
  const outlineCn = cn(
    'rounded-full h-12 text-base px-5 gap-3',
    'sm:h-10 sm:text-sm sm:px-4',
    fullWidth && 'w-full',
    buttonClassName,
  )

  if (isWebProject(project)) {
    return (
      <div className={cn('flex flex-col gap-3', !fullWidth && 'sm:flex-row')}>
        {project.links.website && (
          <Button asChild size="lg" className={btnCn}>
            <a
              href={project.links.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="size-6" />
              {t.visitSite}
            </a>
          </Button>
        )}
        {project.links.github && (
          <Button asChild size="lg" variant="outline" className={outlineCn}>
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-6" />
              {t.githubRepo}
            </a>
          </Button>
        )}
      </div>
    )
  }

  if (isMobileProject(project)) {
    const appleStoreUrl =
      'appleStore' in project.links ? project.links.appleStore : undefined
    const playStoreUrl =
      'playStore' in project.links ? project.links.playStore : undefined

    return (
      <div className={cn('flex flex-col gap-3', !fullWidth && 'sm:flex-row')}>
        {appleStoreUrl && (
          <Button asChild size="lg" className={btnCn}>
            <a href={appleStoreUrl} target="_blank" rel="noopener noreferrer">
              <FaApple className="size-6" />
              {t.appStore}
            </a>
          </Button>
        )}
        {playStoreUrl && (
          <Button asChild size="lg" className={btnCn}>
            <a href={playStoreUrl} target="_blank" rel="noopener noreferrer">
              <FaGooglePlay className="size-6" />
              {t.playStore}
            </a>
          </Button>
        )}
        {project.links.github && (
          <Button asChild size="lg" variant="outline" className={outlineCn}>
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-6" />
              {t.githubRepo}
            </a>
          </Button>
        )}
      </div>
    )
  }

  return null
}
