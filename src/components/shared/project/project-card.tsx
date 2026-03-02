'use client'

import { Badge } from '@/components/ui/badge'
import { Safari } from '@/components/ui/safari'
import { Iphone } from '@/components/ui/iphone'
import { MobileTrio } from './MobileTrio'
import { Project, MobileHeroMedia, ProjectThumbnail } from '@/types/project'
import { usePortfolioStore } from '@/store/use-portfolio-store'
import { useGalleryVideo } from '@/hooks'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface ProjectCardProps {
  project: Project
  index: number
}

// Type guard for MobileHeroMedia
function isMobileHeroMedia(
  thumbnail: ProjectThumbnail | MobileHeroMedia,
): thumbnail is MobileHeroMedia {
  return 'devices' in thumbnail
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { language } = usePortfolioStore()
  const { makeVideoRef: makeSingleVideoRef } = useGalleryVideo(1)
  const { makeVideoRef: makeTrioVideoRef, containerRef: trioContainerRef } =
    useGalleryVideo(3)
  const title = project.title[language]
  const isWeb = project.category === 'web'
  const isMobile = project.category === 'mobile'

  // Get thumbnail URLs
  const getThumbnailData = () => {
    if (
      isWeb &&
      'type' in project.thumbnail &&
      project.thumbnail.type === 'video'
    ) {
      return { videoSrc: project.thumbnail.url, imageSrc: undefined }
    }
    if (
      isWeb &&
      'type' in project.thumbnail &&
      project.thumbnail.type === 'image'
    ) {
      return { videoSrc: undefined, imageSrc: project.thumbnail.url }
    }
    if (isMobile && isMobileHeroMedia(project.thumbnail)) {
      return project.thumbnail.devices.map((device) => ({
        videoSrc: device.type === 'video' ? device.url : undefined,
        imageSrc: device.type === 'image' ? device.url : undefined,
      }))
    }
    if (isMobile && 'type' in project.thumbnail) {
      return [
        {
          videoSrc:
            project.thumbnail.type === 'video'
              ? project.thumbnail.url
              : undefined,
          imageSrc:
            project.thumbnail.type === 'image'
              ? project.thumbnail.url
              : undefined,
        },
      ]
    }
    return null
  }

  const thumbnailData = getThumbnailData()

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group border-border from-background to-muted/30 relative block overflow-hidden rounded-3xl border bg-linear-to-br transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
    >
      <div
        className="from-accent-2/20 to-accent-5/20 relative mb-8 overflow-hidden rounded-2xl bg-linear-to-br px-2 pt-2"
        style={{ aspectRatio: isWeb ? undefined : '1203/753' }}
      >
        {isWeb && thumbnailData && (
          <Safari
            videoSrc={
              (thumbnailData as { videoSrc?: string; imageSrc?: string })
                .videoSrc
            }
            imageSrc={
              (thumbnailData as { videoSrc?: string; imageSrc?: string })
                .imageSrc
            }
            url="preview"
            videoRef={
              (thumbnailData as { videoSrc?: string; imageSrc?: string })
                .videoSrc
                ? makeSingleVideoRef(0)
                : undefined
            }
            className="w-full drop-shadow-2xl"
          />
        )}

        {isMobile && isMobileHeroMedia(project.thumbnail) && (
          <div className="absolute inset-0 flex items-start justify-center px-4 pt-8">
            <MobileTrio
              devices={project.thumbnail.devices}
              containerRef={trioContainerRef}
              makeVideoRef={makeTrioVideoRef}
            />
          </div>
        )}

        {isMobile &&
          !isMobileHeroMedia(project.thumbnail) &&
          'type' in project.thumbnail && (
            <div className="absolute inset-0 flex items-start justify-center pt-8">
              <div className="w-1/3">
                <Iphone
                  videoSrc={
                    project.thumbnail.type === 'video'
                      ? project.thumbnail.url
                      : undefined
                  }
                  src={
                    project.thumbnail.type === 'image'
                      ? project.thumbnail.url
                      : undefined
                  }
                  className="w-full drop-shadow-2xl"
                  videoRef={
                    project.thumbnail.type === 'video'
                      ? makeSingleVideoRef(0)
                      : undefined
                  }
                />
              </div>
            </div>
          )}
      </div>
      {/* Header */}
      <div className="mb-3 flex items-start justify-between px-8">
        <div>
          <div className="">
            <h3 className="text-foreground text-3xl font-bold lg:text-4xl">
              {title}
            </h3>
            <Badge
              key={project.category.toUpperCase()}
              variant="outline"
              className={cn(
                'bg-primary mt-2 shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-opacity hover:opacity-80',
              )}
            >
              {project.category.toUpperCase()}
            </Badge>
          </div>
        </div>
      </div>

      {/* Preview */}

      {/* Tags */}
      <div className="flex flex-wrap gap-4 px-8 pb-8">
        {project.tags.slice(0, 3).map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="py-1 text-xs font-medium"
          >
            {tag}
          </Badge>
        ))}
        {project.tags.length > 3 && (
          <Badge
            variant="outline"
            className="bg-primary py-1 text-xs font-medium text-white"
          >
            +{project.tags.length - 3}
          </Badge>
        )}
      </div>

      {/* Hover effect overlay */}
      <div className="border-primary pointer-events-none absolute inset-0 rounded-3xl border-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Link>
  )
}
