'use client'
import { usePortfolioStore } from '@/store/use-portfolio-store'
import { AuroraText } from '../../ui/aurora-text'
import { AURORA_COLORS } from '@/styles/constants'

type SectionTranslations = Record<
  string,
  {
    title: string
    auroraText?: string
    description?: string | string[]
    [key: string]: unknown
  }
>

type Props = {
  title?: string
  description?: string
  children: React.ReactNode
  titleClassName?: string
  textOrientation?: 'left' | 'center' | 'right'
  translations?: SectionTranslations
  sectionSize?: 'small' | 'medium' | 'large'
  grid?: boolean | false
}

export function ContentSection({
  title,
  description,
  children,
  titleClassName = '',
  textOrientation = 'center',
  translations,
  sectionSize = 'large',
  grid = false,
}: Props) {
  const { language } = usePortfolioStore()
  const t = translations?.[language]
  const resolvedTitle = t?.title ?? title ?? ''
  const resolvedDescription = t?.description ?? description
  const paragraphs = resolvedDescription
    ? Array.isArray(resolvedDescription)
      ? resolvedDescription
      : [resolvedDescription]
    : []
  const sectionSizeClass =
    sectionSize === 'small'
      ? 'max-w-2xl'
      : sectionSize === 'medium'
        ? 'max-w-4xl'
        : 'max-w-7xl'

  return (
    <section className="bg-background mx-6 py-8 md:px-8 md:py-18 lg:py-36">
      <div
        className={`${textOrientation === 'left' ? 'text-center lg:text-left' : 'text-center'} mx-auto w-full ${sectionSizeClass} ${grid ? 'grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-20' : 'flex flex-col items-center'}`}
      >
        <div
          className={`${grid ? 'order-2 md:order-1 lg:col-span-3' : ''} mb-4 flex flex-col ${textOrientation === 'left' ? 'items-center lg:items-start' : textOrientation === 'right' ? 'items-end' : 'items-center'}`}
        >
          <div className="mb-4 flex items-center gap-4 sm:mb-6">
            <span
              className={`text-tx-primary font-sans text-4xl font-medium sm:text-6xl md:text-7xl ${titleClassName}`}
            >
              {resolvedTitle}
            </span>
            <span className="font-title font-bold">
              <AuroraText
                className="text-5xl sm:text-7xl md:text-8xl"
                colors={AURORA_COLORS}
                speed={0.8}
              >
                {t?.auroraText}
              </AuroraText>
            </span>
          </div>

          {paragraphs.map((p, i) => (
            <p key={i} className="text-tx-muted text-xl">
              {p}
            </p>
          ))}
        </div>
        {children}
      </div>
    </section>
  )
}
