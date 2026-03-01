import { notFound } from 'next/navigation'
import { projects } from '@/constants/projects'
import { ProjectHero } from '@/components/shared'

/**
 * Gera os parâmetros estáticos para cada projeto.
 */
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

/**
 * Página de detalhes do projeto — delega toda a composição ao ProjectHero.
 */
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) notFound()

  return (
    <main className="bg-background min-h-screen pt-20">
      <ProjectHero project={project} />
    </main>
  )
}
