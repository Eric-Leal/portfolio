/**
 * @descrição Exibe a mídia principal do projeto — Safari, trio de iPhones ou iPhone único.
 */
'use client'

import { Safari } from '@/components/ui/safari'
import { Iphone } from '@/components/ui/iphone'
import { MobileTrio } from './MobileTrio'
import type { Project, WebProject, ProjectThumbnail } from '@/types/project'
import {
  isWebProject,
  isMobileProject,
  isMobileHeroThumbnail,
  resolveSafariProps,
  resolveIphoneProps,
} from '@/lib/utils/project-logic'

function WebFrame({ project }: { project: WebProject }) {
  return (
    <Safari
      url={project.links.website ?? 'https://example.com'}
      mode="simple"
      {...resolveSafariProps(project.thumbnail as ProjectThumbnail)}
      className="[&_path]:fill-foreground w-full drop-shadow-[0_20px_60px_rgba(0,0,0,0.15)] md:scale-110 md:transform dark:drop-shadow-[0_20px_80px_rgba(255,255,255,0.06)]"
    />
  )
}

function SingleMobile({ thumbnail }: { thumbnail: ProjectThumbnail }) {
  return (
    <div className="mx-auto w-full max-w-55 md:max-w-70">
      <Iphone
        {...resolveIphoneProps(thumbnail)}
        className="[&_path]:fill-foreground drop-shadow-[0_12px_40px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_12px_40px_rgba(255,255,255,0.05)]"
      />
    </div>
  )
}

function ProjectFrame({ project }: { project: Project }) {
  if (isWebProject(project)) return <WebFrame project={project} />

  if (isMobileProject(project)) {
    if (isMobileHeroThumbnail(project.thumbnail)) {
      return <MobileTrio devices={project.thumbnail.devices} />
    }
    return <SingleMobile thumbnail={project.thumbnail as ProjectThumbnail} />
  }

  return null
}

export interface ProjectMediaProps {
  project: Project
}

export function ProjectMedia({ project }: ProjectMediaProps) {
  return (
    <>
      <div className="sticky top-0 z-0 md:hidden">
        <div className="bg-background relative px-8 pt-8 pb-16">
          <ProjectFrame project={project} />
          <div
            aria-hidden
            className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t to-transparent"
          />
        </div>
      </div>

      <div className="hidden items-center justify-center md:flex">
        <ProjectFrame project={project} />
      </div>
    </>
  )
}
