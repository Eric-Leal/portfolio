/**
 * Type guards e resolvers de mídia para o sistema de projetos do portfólio.
 * Centraliza a discriminação de tipos e o mapeamento de thumbnails para props de componentes de mídia.
 */

import type {
  Project,
  WebProject,
  MobileProject,
  MobileHeroMedia,
  ProjectThumbnail,
} from '@/types/project'

export function isWebProject(project: Project): project is WebProject {
  return project.category === 'web'
}

export function isMobileProject(project: Project): project is MobileProject {
  return project.category === 'mobile'
}

export function isMobileHeroThumbnail(
  thumbnail: ProjectThumbnail | MobileHeroMedia,
): thumbnail is MobileHeroMedia {
  return 'devices' in thumbnail
}

export function resolveSafariProps(thumbnail: ProjectThumbnail) {
  return thumbnail.type === 'video'
    ? { videoSrc: thumbnail.url }
    : { imageSrc: thumbnail.url }
}

export function resolveIphoneProps(thumbnail: ProjectThumbnail) {
  return thumbnail.type === 'video'
    ? { videoSrc: thumbnail.url }
    : { src: thumbnail.url }
}
