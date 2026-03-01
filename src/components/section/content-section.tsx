'use client'
import { usePortfolioStore } from '@/store/use-portfolio-store'

type SectionTranslations = Record<
  string,
  { title: string; description?: string }
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
        : 'max-w-5xl'

  return (
    <section className="bg-background flex flex-col items-center justify-center px-6 py-12">
      <div className={`w-full ${sectionSizeClass}`}>
        <div className={`mb-5 text-${textOrientation || 'center'}`}>
          <h1
            className={`font-title text-tx-primary text-4xl font-bold italic sm:text-5xl ${titleClassName || ''}`}
          >
            {resolvedTitle}
          </h1>
          {resolvedDescription && (
            <p className="text-tx-muted text-base">{resolvedDescription}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}
