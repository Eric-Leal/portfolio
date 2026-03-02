'use client'
import { usePortfolioStore } from '@/store/use-portfolio-store'
import { AuroraText } from '../ui/aurora-text'

type SectionTranslations = Record<
  string,
  { title: string; auroraText?: string; description?: string }
>

type Props = {
  title?: string
  description?: string
  children: React.ReactNode
  titleClassName?: string
  textOrientation: 'left' | 'center' | 'right'
  translations?: SectionTranslations
  sectionSize: 'small' | 'medium' | 'large'
}

export function ContentSection({
  title,
  description,
  children,
  titleClassName,
  textOrientation,
  translations,
  sectionSize,
}: Props) {
  const { language } = usePortfolioStore()
  const t = translations?.[language]
  const resolvedTitle = t?.title ?? title ?? ''
  const resolvedDescription = t?.description ?? description
  const sectionSizeClass =
    sectionSize === 'small'
      ? 'max-w-2xl'
      : sectionSize === 'medium'
        ? 'max-w-4xl'
        : 'max-w-7xl'

  const AURORA_COLORS = [
    'var(--color-brand-1)',
    'var(--color-brand-2)',
    'var(--color-brand-3)',
    'var(--color-brand-4)',
    'var(--color-brand-5)',
  ]

  return (
    <section className="bg-background flex flex-col items-center justify-center px-6 py-12">
      <div className={`w-full ${sectionSizeClass}`}>
        <div
          className={`mb-5 flex flex-col ${textOrientation === 'left' ? 'items-start' : textOrientation === 'right' ? 'items-end' : 'items-center'}`}
        >
          <div className="mb-6 flex items-center gap-4">
            <span
              className={`text-tx-primary font-sans text-5xl font-bold sm:text-6xl md:text-7xl ${titleClassName || ''}`}
            >
              {resolvedTitle}
            </span>
            <span className="font-title font-bold">
              <AuroraText
                className="text-6xl sm:text-7xl md:text-8xl"
                colors={AURORA_COLORS}
                speed={0.8}
              >
                {t?.auroraText}
              </AuroraText>
            </span>
          </div>

          {resolvedDescription && (
            <p className="text-tx-muted text-xl">{resolvedDescription}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}
