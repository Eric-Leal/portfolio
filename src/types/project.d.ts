/**
 * String localizada com versões em português e inglês.
 */
export type LocalizedString = { pt: string; en: string }

/**
 * Primitivas compartilhadas
 */
export interface ProjectThumbnail {
  type: 'image' | 'video' | '3d'
  url: string
}

/**
 * Estatísticas ou destaques do projeto, como "1000+ downloads", "5 estrelas na Play Store", etc.
 */
export interface ProjectStat {
  label: LocalizedString
  value: string
}

/**
 * Interface Base para projetos, contendo os campos comuns a todas as categorias.
 */
export interface ProjectBase {
  id: string
  slug: string
  title: LocalizedString
  description: LocalizedString
  thumbnail: ProjectThumbnail
  tags: string[]
  stats?: ProjectStat[]
  featured?: boolean
}

/**
 * Tipos para Projetos Web
 */
export interface WebProjectLinks {
  github?: string
  website?: string
}

export interface WebProject extends ProjectBase {
  category: 'web'
  links: WebProjectLinks
}

/**
 * Tipos para Projetos Mobile
 */
type MobileProjectLinksBase = {
  github?: string
  appleStore?: string
  playStore?: string
}

type WithAppleStore = MobileProjectLinksBase & { appleStore: string }
type WithPlayStore = MobileProjectLinksBase & { playStore: string }

export type MobileProjectLinks = WithAppleStore | WithPlayStore

export interface MobileHeroMedia {
  devices: [ProjectThumbnail, ProjectThumbnail, ProjectThumbnail]
}

export interface MobileProject extends ProjectBase {
  category: 'mobile'
  thumbnail: ProjectThumbnail | MobileHeroMedia
  links: MobileProjectLinks
}

/**
 * Tipos discriminados para garantir que cada projeto tenha os campos corretos de acordo com sua categoria.
 */
export type Project = WebProject | MobileProject
