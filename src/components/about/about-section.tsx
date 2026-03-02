'use client'

import Image from 'next/image'
import { usePortfolioStore } from '@/store/use-portfolio-store'
import { aboutSectionTranslations } from '@/components/section/section-translations'
import { AuroraText } from '@/components/ui/aurora-text'

// ─── Component ────────────────────────────────────────────────────────────────

const AURORA_COLORS = [
  'var(--color-brand-1)',
  'var(--color-brand-2)',
  'var(--color-brand-3)',
  'var(--color-brand-4)',
  'var(--color-brand-5)',
]

export function AboutSection() {
  const { language } = usePortfolioStore()
  const t = aboutSectionTranslations[language]

  return (
    <section
      id="about"
      className="bg-background px-6 py-20 md:px-8 md:py-28 lg:py-36"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-5 lg:gap-20">
        {/* ── Texto ─────────────────────────────────────────────────────────── */}
        <div className="order-2 lg:order-1 lg:col-span-3">
          <h2 className="mb-6 flex items-baseline gap-3 font-sans text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
            <span className="text-tx-primary">{t.titleStart}</span>
            <AuroraText colors={AURORA_COLORS} speed={0.8}>
              {t.titleHighlight}
            </AuroraText>
          </h2>

          <div className="space-y-4">
            {t.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-tx-secondary text-base leading-relaxed"
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* ── Foto ──────────────────────────────────────────────────────────── */}
        <div className="order-1 flex justify-center lg:order-2 lg:col-span-2 lg:justify-end">
          <div className="border-border bg-card relative aspect-3/4 w-full max-w-xs overflow-hidden rounded-3xl border shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
              alt={t.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 80vw, (max-width: 1024px) 40vw, 320px"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
