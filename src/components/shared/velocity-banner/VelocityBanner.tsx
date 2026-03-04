'use client'

import { cn } from '@/lib/utils'
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from '@/components/ui/scroll-based-velocity'
import { usePortfolioStore } from '@/store/use-portfolio-store'
import { Sparkle } from 'lucide-react'

interface VelocityBannerProps {
  className?: string
  baseVelocity?: number
}

const TRANSLATIONS: Record<string, string[]> = {
  pt: [
    'ENGENHARIA DE SOFTWARE',
    'TECNOLOGIA',
    'DESENVOLVIMENTO WEB',
    'MOBILE',
    'FULLSTACK',
  ],
  en: [
    'SOFTWARE ENGINEER',
    'TECHNOLOGY',
    'WEB DEVELOPMENT',
    'MOBILE',
    'FULLSTACK',
  ],
}

export function VelocityBanner({
  className,
  baseVelocity = 4,
}: VelocityBannerProps) {
  const { language } = usePortfolioStore()
  const words = TRANSLATIONS[language] ?? TRANSLATIONS.pt

  const block = (
    <div className="inline-flex items-center whitespace-nowrap">
      {words.map((w, i) => (
        <span
          key={w + i}
          className="mr-3 inline-flex items-center gap-3 last:mr-3"
        >
          <span className="text-border font-sans text-xl tracking-tighter uppercase md:text-2xl xl:text-3xl">
            {w}
          </span>
          <Sparkle
            className="text-border h-5 w-5 shrink-0"
            size={30}
            aria-hidden
          />
        </span>
      ))}
    </div>
  )

  return (
    <div
      role="marquee"
      aria-label={words.join(' • ')}
      aria-live="off"
      className={cn(
        'flex h-16 items-center overflow-hidden bg-(--color-accent-5) backdrop-blur-sm md:h-24',
        'md:h-18',
        className,
      )}
    >
      {/* Hidden, concise readable text for assistive tech */}
      <span className="sr-only">{words.join(' • ')}</span>

      <ScrollVelocityContainer className="py-0">
        <ScrollVelocityRow
          baseVelocity={baseVelocity}
          direction={1}
          scrollReactivity
        >
          {block}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </div>
  )
}
