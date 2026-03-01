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

import { GithubCalendar } from '@/components/github/github-calendar'
import { fetchGitHubData } from '@/lib/github'
import type { GitHubData } from '@/lib/github'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Converte uma data ISO em “há X dias/horas” em português */
function relativeDate(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime()
  const minutes = Math.floor(diff / 60_000)
  const hours   = Math.floor(diff / 3_600_000)
  const days    = Math.floor(diff / 86_400_000)

  if (minutes < 60)  return `há ${minutes} min`
  if (hours   < 24)  return `há ${hours} hora${hours > 1 ? 's' : ''}`
  if (days    === 1) return 'ontem'
  if (days    <  30) return `há ${days} dias`

  const months = Math.floor(days / 30)
  return `há ${months} mês${months > 1 ? 'es' : ''}`
}

/** Formata números grandes: 1200 → 1.2k */
function formatCount(n: number): string {
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace('.0', '')}k`
  return String(n)
}

// ─── Fallback (quando GITHUB_USERNAME não está configurado) ──────────────────

const EMPTY_DATA: GitHubData = {
  profile: {
    name: 'Seu Nome',
    login: 'username',
    avatarUrl: '',
    followers: 0,
    publicRepos: 0,
    totalStars: 0,
  },
  languages: [],
  latestCommit: null,
  contributionMap: {},
  totalContributions: 0,
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function GithubPage() {
  const login = process.env.GITHUB_USERNAME

  const data = login
    ? await fetchGitHubData(login).catch((err) => {
        console.error('[GithubPage]', err)
        return EMPTY_DATA
      })
    : EMPTY_DATA

  const { profile, languages, latestCommit, contributionMap, totalContributions } = data

  const initials = profile.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const profileStats = [
    { label: 'Seguidores',    value: formatCount(profile.followers),   icon: Users },
    { label: 'Repositórios', value: String(profile.publicRepos),      icon: BookMarked },
    { label: 'Stars',         value: formatCount(profile.totalStars), icon: Star },
  ]

  return (
    <div className="bg-background min-h-screen">
      <main className="mx-auto max-w-6xl px-8 pt-32 pb-20">
        {/* ── Título da Seção ─────────────────────────────────────────────── */}
        <section className="mb-10">
          <h1 className="text-tx-primary mb-3 text-5xl font-bold tracking-tight">
            Atividades no{' '}
            <span className="font-title italic text-accent-2">Github</span>
          </h1>
          <p className="text-tx-secondary max-w-lg text-sm leading-relaxed">
            Acompanhe meu fluxo de trabalho diário, contribuições em projetos
            open-source e as tecnologias que mais utilizo no meu ecossistema de
            desenvolvimento.
          </p>
        </section>

        {/* ── Grid de Cards ───────────────────────────────────────────────── */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Card 1 — Perfil do GitHub */}
          <Card className="border-border bg-card gap-0 rounded-2xl border py-0">
            <CardContent className="p-6">
              {/* Avatar + Nome */}
              <div className="mb-5 flex items-center gap-3">
                <Avatar className="h-11 w-11 ring-2 ring-border">
                  <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                  <AvatarFallback className="bg-brand-5/20 text-tx-primary text-sm font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-tx-primary text-sm font-bold leading-tight">
                    {profile.name}
                  </p>
                  <p className="text-tx-muted text-xs">@{profile.login}</p>
                </div>
              </div>

              <Separator className="bg-border mb-4" />

              {/* Stats */}
              <div className="space-y-3">
                {profileStats.map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
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
                Último Commit
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              {latestCommit ? (
                <>
                  <p className="text-tx-primary mb-3 line-clamp-3 text-base font-bold leading-snug">
                    {latestCommit.message}
                  </p>
                  <div className="text-tx-muted mb-4 flex items-center gap-1.5 text-xs">
                    <GitBranch size={12} />
                    <span className="text-tx-secondary font-medium">{latestCommit.repo}</span>
                    <span>•</span>
                    <span>{relativeDate(latestCommit.date)}</span>
                  </div>
                  <a
                    href={latestCommit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-2 hover:text-accent-1 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase transition-colors"
                  >
                    Ver no GitHub
                    <ExternalLink size={11} />
                  </a>
                </>
              ) : (
                <p className="text-tx-muted text-sm">Nenhum commit encontrado</p>
              )}
            </CardContent>
          </Card>

          {/* Card 3 — Top Linguagens */}
          <Card className="border-border bg-card gap-0 rounded-2xl border py-0">
            <CardHeader className="px-6 pt-6 pb-4">
              <CardTitle className="text-tx-primary flex items-center gap-2 text-sm font-semibold">
                <BarChart2 size={14} className="text-accent-2" />
                Top Linguagens
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5 px-6 pb-6">
              {languages.length > 0 ? (
                languages.map(({ name, percentage, colorClass }) => (
                  <div key={name}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-tx-secondary text-xs font-medium">{name}</span>
                      <span className="text-tx-muted text-xs">{percentage}%</span>
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
                <p className="text-tx-muted text-sm">Nenhuma linguagem encontrada</p>
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
                Contribuições no último ano
              </span>
              <span className="text-tx-secondary text-xs font-normal">
                {totalContributions.toLocaleString('pt-BR')} contribuições
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
      <footer className="border-border border-t py-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8">
          <p className="text-tx-muted text-xs">
            © 2026 {profile.name}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: 'GitHub',   href: `https://github.com/${profile.login}` },
              { label: 'LinkedIn', href: '#' },
              { label: 'Twitter',  href: '#' },
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
      </footer>
    </div>
  )
}
