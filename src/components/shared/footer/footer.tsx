'use client'

import Image from 'next/image'
import Link from 'next/link'
import { LuGithub, LuLinkedin } from 'react-icons/lu'
import { Button } from '@/components/ui/button'
import { AuroraText } from '@/components/ui/aurora-text'
import { usePortfolioStore } from '@/store/use-portfolio-store'
import { navigationTranslations } from '@/constants/navigation'
import { cn } from '@/lib/utils'
import { AURORA_COLORS } from '@/styles/constants'

// ─── Data ─────────────────────────────────────────────────────────────────────

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/Eric-Leal',
    icon: LuGithub,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ericgleal/',
    icon: LuLinkedin,
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function Footer() {
  const { language } = usePortfolioStore()
  const t = navigationTranslations[language]

  const sectionLinks = [
    { label: t.about, href: '/#about' },
    { label: t.projects, href: '/#projects' },
    { label: t.experience, href: '/#experience' },
  ]

  const resourceLinks = [
    { label: t.guestbook, href: '/guestbook' },
    { label: t.githubActivity, href: '/github' },
  ]

  return (
    <footer className="border-primary/30 border-t px-4 pt-10 pb-20 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* ── Hero Row ───────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Avatar placeholder */}
          <div
            className="border-border bg-card relative shrink-0 overflow-hidden rounded-full border-2"
            style={{
              width: 'clamp(120px, 20vw, 180px)',
              height: 'clamp(120px, 20vw, 180px)',
            }}
            aria-label="Foto de perfil"
          >
            <Image
              src="/images/Eric.jpg"
              alt="Foto de perfil de Eric"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 120px, 180px"
              priority
            />
          </div>

          {/* Headline — right-aligned on desktop */}
          <h2
            className={cn(
              'text-tx-primary font-sans leading-[1.05] font-medium',
              'text-center text-4xl sm:text-5xl lg:text-right lg:text-6xl xl:text-7xl',
            )}
          >
            {t.footerHeadline}{' '}
            <span className="font-title font-bold">
              <AuroraText
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl"
                colors={AURORA_COLORS}
                speed={0.8}
              >
                {t.footerHighlight}
              </AuroraText>{' '}
            </span>
            {t.footerHeadlineEnd}
          </h2>
        </div>

        {/* ── Links Card ─────────────────────────────────────────────────── */}
        <div
          className={cn(
            'border-primary/40 rounded-2xl border px-5 py-6 sm:px-6 sm:py-8',
            'grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-3',
          )}
        >
          {/* Seções */}
          <div className="flex flex-col gap-3">
            <p className="text-accent-5 text-xs font-semibold tracking-widest uppercase">
              {t.footerSectionsTitle}
            </p>
            <nav
              className="flex flex-col gap-2"
              aria-label={t.footerSectionsTitle}
            >
              {sectionLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-tx-secondary hover:text-tx-primary w-fit text-sm transition-colors duration-150',
                    'focus-visible:ring-ring rounded focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none',
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Recursos */}
          <div className="flex flex-col gap-3">
            <p className="text-accent-5 text-xs font-semibold tracking-widest uppercase">
              {t.footerResourcesTitle}
            </p>
            <nav
              className="flex flex-col gap-2"
              aria-label={t.footerResourcesTitle}
            >
              {resourceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-tx-secondary hover:text-tx-primary w-fit text-sm transition-colors duration-150',
                    'focus-visible:ring-ring rounded focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none',
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Conecte-se*/}
          <div className="col-span-2 flex flex-col gap-3 lg:col-span-1">
            <p className="text-accent-5 text-xs font-semibold tracking-widest uppercase">
              {t.footerConnectTitle}
            </p>
            <div
              className="flex items-center gap-2"
              role="list"
              aria-label={t.footerConnectTitle}
            >
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Button
                  key={label}
                  variant="outline"
                  size="icon"
                  asChild
                  role="listitem"
                  className={cn(
                    'border-accent-5/50 text-accent-5',
                    'hover:border-accent-5 hover:bg-accent-5/10 hover:text-accent-5',
                    'h-10 w-10 rounded-xl transition-colors duration-150',
                    'focus-visible:ring-ring',
                  )}
                  aria-label={label}
                >
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <Icon size={18} />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Copyright ──────────────────────────────────────────────────── */}
        <p className="text-tx-secondary text-center text-xs">{t.copyright}</p>
      </div>
    </footer>
  )
}
