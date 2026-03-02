'use client'

import { ProjectCard } from './project-card'
import { projects } from '@/constants/projects'

export function ProjectsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  )
}
