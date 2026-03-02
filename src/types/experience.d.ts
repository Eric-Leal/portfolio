/**
 * Categoria da experiência na timeline.
 * - 'work'      → experiência profissional (Briefcase)
 * - 'education' → formação acadêmica / aprendizado (GraduationCap)
 * - 'code'      → projetos de código / open-source (Code)
 */
export type ExperienceCategory = 'work' | 'education' | 'code'

/**
 * Tradução completa da seção de experiências, incluindo metadados e itens.
 */
export type ExperienceSectionTranslation = {
  title: string
  auroraText: string
  description: string
  items: Experience[]
}

/**
 * Representa uma entrada na timeline profissional.
 */
export interface Experience {
  /** Ano ou período da experiência, ex.: '2023' ou '2021 – 2023' */
  year: string
  /** Cargo ou título do papel desempenhado */
  role: string
  /** Nome da empresa ou instituição */
  company: string
  /** Descrição das responsabilidades e conquistas */
  description: string
  /** Categoria usada para escolher o ícone e cor representativos */
  category: ExperienceCategory
}
