'use client'

import {
  Clock,
  BarChart2,
  ExternalLink,
  GitBranch,
  Users,
  BookMarked,
  Star,
  Calendar,
} from 'lucide-react'

import { GithubCalendar } from '@/components/shared/github/github-calendar'
import type { GitHubData } from '@/lib/github'
import { usePortfolioStore } from '@/store/use-portfolio-store'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { AuroraText } from '@/components/ui/aurora-text'

// ─── Translations ─────────────────────────────────────────────────────────────

const githubPageTranslations = {
  pt: {
    titleStart: 'Atividades no',
    description:
      'Acompanhe meu fluxo de trabalho diário, contribuições em projetos open-source e as tecnologias que mais utilizo no meu ecossistema de desenvolvimento.',
    followers: 'Seguidores',
    repositories: 'Repositórios',
    lastCommit: 'Último Commit',
    viewOnGithub: 'Ver no GitHub',
    noCommit: 'Nenhum commit encontrado',
    topLanguages: 'Top Linguagens',
    noLanguages: 'Nenhuma linguagem encontrada',
    contributionsTitle: 'Contribuições no último ano',
    contributionsCount: (n: number) =>
      `${n.toLocaleString('pt-BR')} contribuições`,
    rights: (name: string) => `© 2026 ${name}. Todos os direitos reservados.`,
    relativeDate: (isoDate: string): string => {
      const diff = Date.now() - new Date(isoDate).getTime()
      const minutes = Math.floor(diff / 60_000)
      const hours = Math.floor(diff / 3_600_000)
      const days = Math.floor(diff / 86_400_000)
      if (minutes < 60) return `há ${minutes} min`
      if (hours < 24) return `há ${hours} hora${hours > 1 ? 's' : ''}`
      if (days === 1) return 'ontem'
      if (days < 30) return `há ${days} dias`
      const months = Math.floor(days / 30)
      return `há ${months} mês${months > 1 ? 'es' : ''}`
    },
  },
  en: {
    titleStart: 'Activity on',
    description:
      'Track my daily workflow, contributions to open-source projects, and the technologies I use most in my development ecosystem.',
    followers: 'Followers',
    repositories: 'Repositories',
    lastCommit: 'Latest Commit',
    viewOnGithub: 'View on GitHub',
    noCommit: 'No commit found',
    topLanguages: 'Top Languages',
    noLanguages: 'No languages found',
    contributionsTitle: 'Contributions in the last year',
    contributionsCount: (n: number) =>
      `${n.toLocaleString('en-US')} contributions`,
    rights: (name: string) => `© 2026 ${name}. All rights reserved.`,
    relativeDate: (isoDate: string): string => {
      const diff = Date.now() - new Date(isoDate).getTime()
      const minutes = Math.floor(diff / 60_000)
      const hours = Math.floor(diff / 3_600_000)
      const days = Math.floor(diff / 86_400_000)
      if (minutes < 60) return `${minutes} min ago`
      if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
      if (days === 1) return 'yesterday'
      if (days < 30) return `${days} days ago`
      const months = Math.floor(days / 30)
      return `${months} month${months > 1 ? 's' : ''} ago`
    },
  },
} as const

function formatCount(n: number): string {
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace('.0', '')}k`
  return String(n)
}

export function GithubPageContent({ data }: { data: GitHubData }) {
  const { language } = usePortfolioStore()
  const t = githubPageTranslations[language]

  const {
    profile,
    languages,
    latestCommit,
    contributionMap,
    totalContributions,
  } = data

  const initials = profile.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const profileStats = [
    { label: t.followers, value: formatCount(profile.followers), icon: Users },
    {
      label: t.repositories,
      value: String(profile.publicRepos),
      icon: BookMarked,
    },
    { label: 'Stars', value: formatCount(profile.totalStars), icon: Star },
  ]

  return (
    <div className="bg-background min-h-screen">
      <main className="mx-auto max-w-6xl px-8 pt-32 pb-20">
        {/* ── Título da Seção ─────────────────────────────────────────────── */}
        <section className="mb-10">
          <h1 className="text-tx-primary mb-3 text-5xl font-medium tracking-tight">
            {t.titleStart}{' '}
            <span className="font-title text-6xl font-bold italic">
              <AuroraText
                colors={[
                  'var(--color-brand-1)',
                  'var(--color-brand-2)',
                  'var(--color-brand-3)',
                  'var(--color-brand-4)',
                  'var(--color-brand-5)',
                ]}
              >
                Github
              </AuroraText>
            </span>
          </h1>
          <p className="text-tx-secondary text-md max-w-lg leading-relaxed">
            {t.description}
          </p>
        </section>

        {/* ── Grid de Cards ───────────────────────────────────────────────── */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Card 1 — Perfil do GitHub */}
          <Card className="border-border bg-card gap-0 rounded-2xl border py-0">
            <CardContent className="p-6">
              {/* Avatar + Nome */}
              <div className="mb-5 flex items-center gap-3">
                <Avatar className="ring-border h-11 w-11 ring-2">
                  <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                  <AvatarFallback className="bg-brand-5/20 text-tx-primary text-sm font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-tx-primary text-sm leading-tight font-bold">
                    {profile.name}
                  </p>
                  <p className="text-tx-muted text-xs">@{profile.login}</p>
                </div>
              </div>

              <Separator className="bg-border mb-4" />

              {/* Stats */}
              <div className="space-y-3">
                {profileStats.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-tx-secondary text-sm">{label}</span>
                    <span className="text-tx-primary text-sm font-bold">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card 2 — Último Commit */}
          <Card className="border-border bg-card gap-0 rounded-2xl border py-0">
            <CardHeader className="px-6 pt-6 pb-4">
              <CardTitle className="text-tx-primary flex items-center gap-2 text-sm font-semibold">
                <Clock size={14} className="text-accent-2" />
                {t.lastCommit}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              {latestCommit ? (
                <>
                  <p className="text-tx-primary mb-3 line-clamp-3 text-base leading-snug font-bold">
                    {latestCommit.message}
                  </p>
                  <div className="text-tx-muted mb-4 flex items-center gap-1.5 text-xs">
                    <GitBranch size={12} />
                    <span className="text-tx-secondary font-medium">
                      {latestCommit.repo}
                    </span>
                    <span>•</span>
                    <span>{t.relativeDate(latestCommit.date)}</span>
                  </div>
                  <a
                    href={latestCommit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-2 hover:text-accent-1 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase transition-colors"
                  >
                    {t.viewOnGithub}
                    <ExternalLink size={11} />
                  </a>
                </>
              ) : (
                <p className="text-tx-muted text-sm">{t.noCommit}</p>
              )}
            </CardContent>
          </Card>

          {/* Card 3 — Top Linguagens */}
          <Card className="border-border bg-card gap-0 rounded-2xl border py-0">
            <CardHeader className="px-6 pt-6 pb-4">
              <CardTitle className="text-tx-primary flex items-center gap-2 text-sm font-semibold">
                <BarChart2 size={14} className="text-accent-2" />
                {t.topLanguages}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5 px-6 pb-6">
              {languages.length > 0 ? (
                languages.map(({ name, percentage, colorClass }) => (
                  <div key={name}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-tx-secondary text-xs font-medium">
                        {name}
                      </span>
                      <span className="text-tx-muted text-xs">
                        {percentage}%
                      </span>
                    </div>
                    <div className="bg-border h-1.5 w-full overflow-hidden rounded-full">
                      <div
                        className={`h-full rounded-full ${colorClass} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-tx-muted text-sm">{t.noLanguages}</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ── Heatmap de Contribuições ──────────────────────────────────────────── */}
        <Card className="border-border bg-card mt-4 gap-0 rounded-2xl border py-0">
          <CardHeader className="px-6 pt-6 pb-4">
            <CardTitle className="text-tx-primary flex items-center justify-between text-sm font-semibold">
              <span className="flex items-center gap-2">
                <Calendar size={14} className="text-accent-2" />
                {t.contributionsTitle}
              </span>
              <span className="text-tx-secondary text-xs font-normal">
                {t.contributionsCount(totalContributions)}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <GithubCalendar
              contributionMap={contributionMap}
              totalContributions={totalContributions}
            />
          </CardContent>
        </Card>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      {/* <footer className="border-border border-t py-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8">
          <p className="text-tx-muted text-xs">{t.rights(profile.name)}</p>
          <div className="flex items-center gap-6">
            {[
              { label: 'GitHub', href: `https://github.com/${profile.login}` },
              { label: 'LinkedIn', href: '#' },
              { label: 'Twitter', href: '#' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-tx-muted hover:text-tx-primary text-xs transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer> */}
    </div>
  )
}
