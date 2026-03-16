/**
 * @file ProjectHero.tsx
 * @descrição Orquestra o layout de storytelling da página de detalhes do projeto.
 * Componente cliente que lê o idioma ativo do store Zustand e repassa para os sub-componentes.
 *
 * Desktop: grid assimétrico com mídia e painel de info/stats/ações na primeira linha;
 * seção "Sobre o projeto" em largura reduzida abaixo.
 *
 * Mobile: mídia sticky no topo, card de conteúdo em overlay e botões fixados na base da tela.
 */
'use client'

import { ProjectMedia } from './ProjectMedia'
import { ProjectInfo } from './ProjectInfo'
import { ProjectStats } from './ProjectStats'
import { ProjectActions } from './ProjectActions'
import { ProjectGallery } from './gallery/ProjectGallery'
import { AuroraText } from '@/components/ui/aurora-text'
import { usePortfolioStore } from '@/store/use-portfolio-store'
import type { Project } from '@/types/project'
import { AURORA_COLORS } from '@/styles/constants'
import { ProjectThemeApplier } from './ProjectThemeApplier'

const PROJECT_TRANSLATIONS = {
  pt: { aboutLabel: 'Sobre o', aboutHighlight: 'projeto' },
  en: { aboutLabel: 'About the', aboutHighlight: 'project' },
} as const

export interface ProjectHeroProps {
  project: Project
}

/**
 * Orquestrador completo da página de detalhes — gerencia os dois layouts responsivos.
 */
export function ProjectHero({ project }: ProjectHeroProps) {
  const { language } = usePortfolioStore()
  const t = PROJECT_TRANSLATIONS[language]
  const hasStats = project.stats && project.stats.length > 0

  // Deriva as cores do aurora a partir do tema do projeto (prioriza dark, fallback light, fallback padrão)
  const theme = project.theme
  const themePalette = theme?.dark ?? theme?.light
  const auroraColors = themePalette
    ? ([
        themePalette.accent1,
        themePalette.accent2,
        themePalette.accent3,
        themePalette.accent4,
        themePalette.accent5,
      ].filter(Boolean) as string[])
    : AURORA_COLORS
  const resolvedAuroraColors =
    auroraColors.length >= 2 ? auroraColors : AURORA_COLORS

  return (
    <>
      <ProjectThemeApplier theme={project.theme} />
      <div className="hidden md:relative md:mt-12 md:block">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-[1.1fr_0.9fr] items-center gap-12 lg:gap-20">
            <ProjectMedia project={project} />

            <div className="flex flex-col gap-7">
              <ProjectInfo
                project={project}
                language={language}
                showDescription={false}
              />
              {hasStats && (
                <ProjectStats stats={project.stats!} language={language} />
              )}
              <ProjectActions
                project={project}
                language={language}
                buttonClassName="px-8 py-5 text-sm font-semibold"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-6xl px-6 pb-24">
          <h2 className="mb-6 flex items-center gap-2">
            <span className="text-tx-primary font-sans text-2xl font-normal md:text-5xl">
              {t.aboutLabel}
            </span>
            <span className="font-title font-bold">
              <AuroraText
                className="text-3xl md:text-6xl"
                colors={resolvedAuroraColors}
                speed={0.8}
              >
                {t.aboutHighlight}
              </AuroraText>
            </span>
          </h2>
          <p
            className="text-tx-secondary [&_b]:text-tx-primary font-sans text-base leading-relaxed lg:text-lg [&_b]:font-semibold"
            dangerouslySetInnerHTML={{ __html: project.description[language] }}
          />

          {project.gallery && project.gallery.length >= 3 && (
            <div className="mt-12">
              <ProjectGallery gallery={project.gallery} />
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden">
        <ProjectMedia project={project} />

        <div className="bg-background relative z-10 -mt-8 rounded-t-3xl px-6 pt-8 pb-40 shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
          <div className="flex flex-col gap-6">
            <ProjectInfo
              project={project}
              language={language}
              showDescription
              tagScrollable={false}
            />
            {hasStats && (
              <ProjectStats stats={project.stats!} language={language} />
            )}
            {project.gallery && project.gallery.length >= 3 && (
              <div className="mt-2">
                <ProjectGallery gallery={project.gallery} />
              </div>
            )}
          </div>
        </div>

        <div className="border-border/60 bg-background/20 fixed bottom-0 left-0 z-50 w-full border-t backdrop-blur-md">
          <div className="px-4 py-4 pb-6">
            <ProjectActions project={project} language={language} fullWidth />
          </div>
        </div>
      </div>
    </>
  )
}
