/**
 * String localizada com versões em português e inglês.
 */
export type LocalizedString = { pt: string; en: string }

/**
 * Paleta de cores para um modo (light ou dark).
 * Cada campo mapeia diretamente para uma CSS custom property da aplicação.
 */
export interface ProjectThemeColors {
  /** Sobrescreve --accent-1 */
  accent1?: string
  /** Sobrescreve --accent-2 */
  accent2?: string
  /** Sobrescreve --accent-3 */
  accent3?: string
  /** Sobrescreve --accent-4 */
  accent4?: string
  /** Sobrescreve --accent-5 */
  accent5?: string
  /** Sobrescreve --primary e --ring (cor dos botões e foco) */
  primary?: string
}

/**
 * Tema visual por projeto — cores e cursor customizados.
 * Configure no campo `theme` de cada projeto em constants/projects.ts.
 *
 * @example
 * theme: {
 *   dark: { accent1: '#ff4500', primary: '#ff4500' },
 *   light: { accent1: '#cc3500', primary: '#cc3500' },
 *   cursors: { default: '/cursors/game-default.cur', pointer: '/cursors/game-link.cur' },
 * }
 */
export interface ProjectTheme {
  /** Paleta aplicada no modo claro */
  light?: ProjectThemeColors
  /** Paleta aplicada no modo escuro */
  dark?: ProjectThemeColors
  /**
   * Caminhos de cursor customizados relativos a /public/.
   * Deixe undefined para usar o cursor padrão do portfolio.
   */
  cursors?: {
    /** Cursor padrão — substitui pointer.cur */
    default?: string
    /** Cursor de links e botões — substitui link.cur */
    pointer?: string
    /** Cursor de inputs de texto — substitui beam.cur */
    text?: string
  }
}

/**
 * Item de mídia para a galeria de imagens/vídeos do projeto.
 * Mínimo 3 itens, máximo 4.
 */
export interface GalleryItem {
  type: 'image' | 'video'
  url: string
  /** Texto alternativo para acessibilidade. */
  alt?: string
}

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
  /** Tema visual do projeto — sobrescreve cores e cursor na página de detalhes. */
  theme?: ProjectTheme
  gallery?:
    | [GalleryItem, GalleryItem, GalleryItem]
    | [GalleryItem, GalleryItem, GalleryItem, GalleryItem]
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

export interface GameProject extends ProjectBase {
  category: 'game'
  links: WebProjectLinks
}

/**
 * Tipos discriminados para garantir que cada projeto tenha os campos corretos de acordo com sua categoria.
 */
export type Project = WebProject | MobileProject | GameProject
