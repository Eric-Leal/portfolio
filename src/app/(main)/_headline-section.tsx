'use client'

import { usePortfolioStore } from '@/store/use-portfolio-store'
import { headlineTranslations } from '@/components/section/section-translations'

export function HeadlineSection() {
  const { language } = usePortfolioStore()
  const t = headlineTranslations[language]

  return (
    <main className="pointer-events-none relative z-10 mx-auto flex h-full max-w-350 flex-col items-center px-6 pt-24 lg:grid lg:grid-cols-3 lg:items-center lg:px-16 lg:pt-0">
      <div className="flex flex-col items-center justify-center text-center lg:items-start lg:self-start lg:pt-32 lg:text-left">
        <h1 className="text-tx-primary pointer-events-auto text-3xl leading-[1.1] font-bold tracking-tighter sm:text-4xl md:text-4xl lg:text-5xl xl:text-7xl">
          {t.greeting} <br className="hidden lg:block" /> {t.name}
        </h1>
      </div>

      <div className="hidden lg:block lg:h-full" />

      <div className="mt-4 flex flex-col items-center justify-center text-center lg:mt-0 lg:items-end lg:self-center lg:text-right">
        <h2 className="font-title text-tx-primary pointer-events-auto flex flex-col text-6xl leading-[1.1] font-bold italic sm:text-7xl md:text-8xl lg:text-6xl xl:text-8xl">
          <span className="text-accent-2">{t.rolePart1}</span>
          <span className="text-accent-5 lg:whitespace-nowrap">
            {t.rolePart2}
          </span>
        </h2>
      </div>
    </main>
  )
}
