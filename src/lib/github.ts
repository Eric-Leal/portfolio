// ─── GitHub API Client ────────────────────────────────────────────────────────
// Todas as chamadas à API do GitHub concentradas aqui.
// Autenticação via GITHUB_TOKEN (variável de ambiente server-side).
// GraphQL: dados ricos em uma única request (perfil + contribuições + linguagens).
// REST Events: commit mais recente (mais simples que GraphQL para isso).

const GITHUB_API = 'https://api.github.com'
const GITHUB_GRAPHQL = 'https://api.github.com/graphql'

// ─── Types ────────────────────────────────────────────────────────────────────

export type GitHubProfile = {
  name: string
  login: string
  avatarUrl: string
  followers: number
  publicRepos: number
  totalStars: number
}

export type LanguageStat = {
  name: string
  percentage: number
  // cores do design system mapeadas por linguagem
  colorClass: string
}

export type LatestCommit = {
  message: string
  repo: string
  date: string // ISO string
  url: string
}

export type ContributionMap = Record<string, number> // { "YYYY-MM-DD": count }

export type GitHubData = {
  profile: GitHubProfile
  languages: LanguageStat[]
  latestCommit: LatestCommit | null
  contributionMap: ContributionMap
  totalContributions: number
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

function authHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function graphql<T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(GITHUB_GRAPHQL, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ query, variables }),
    // Revalida a cada hora — dados de portfólio não precisam de tempo real
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    throw new Error(`GitHub GraphQL error: ${res.status} ${res.statusText}`)
  }

  const json = (await res.json()) as { data: T; errors?: unknown[] }

  if (json.errors?.length) {
    console.error('[github] GraphQL errors:', json.errors)
  }

  return json.data
}

// ─── Language color mapping (design system) ──────────────────────────────────

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: 'bg-brand-4',
  JavaScript: 'bg-brand-3',
  Python: 'bg-accent-4',
  React: 'bg-brand-5',
  'C#': 'bg-accent-3',
  Java: 'bg-brand-2',
  Go: 'bg-accent-2',
  Rust: 'bg-brand-1',
  CSS: 'bg-accent-1',
  HTML: 'bg-brand-3',
}

function langColor(name: string): string {
  return LANGUAGE_COLORS[name] ?? 'bg-accent-5'
}

// ─── GraphQL Queries ──────────────────────────────────────────────────────────

const PROFILE_AND_CONTRIBUTIONS_QUERY = /* graphql */ `
  query PortfolioData($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      name
      login
      avatarUrl

      followers { totalCount }

      repositories(
        first: 100
        privacy: PUBLIC
        isFork: false
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        totalCount
        nodes {
          primaryLanguage { name }
          stargazerCount
          languages(first: 8, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node { name }
            }
          }
        }
      }

      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`

// ─── Tipos internos do retorno GraphQL ───────────────────────────────────────

type GQLData = {
  user: {
    name: string
    login: string
    avatarUrl: string
    followers: { totalCount: number }
    repositories: {
      totalCount: number
      nodes: Array<{
        primaryLanguage: { name: string } | null
        stargazerCount: number
        languages: {
          edges: Array<{
            size: number
            node: { name: string }
          }>
        }
      }>
    }
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number
        weeks: Array<{
          contributionDays: Array<{
            date: string
            contributionCount: number
          }>
        }>
      }
    }
  }
}

// ─── REST: latest commit via Events API ──────────────────────────────────────

type GitHubEvent = {
  type: string
  repo: { name: string }
  payload: {
    commits?: Array<{ message: string; url: string }>
    ref?: string
  }
  created_at: string
}

async function fetchLatestCommit(login: string): Promise<LatestCommit | null> {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${login}/events/public?per_page=30`,
      {
        headers: authHeaders(),
        next: { revalidate: 3600 },
      },
    )

    if (!res.ok) return null

    const events = (await res.json()) as GitHubEvent[]

    const pushEvent = events.find(
      (e) => e.type === 'PushEvent' && (e.payload.commits?.length ?? 0) > 0,
    )

    if (!pushEvent || !pushEvent.payload.commits?.length) return null

    const commit =
      pushEvent.payload.commits[pushEvent.payload.commits.length - 1]
    const repoName = pushEvent.repo.name.split('/')[1] ?? pushEvent.repo.name

    return {
      message: commit.message.split('\n')[0], // apenas a primeira linha
      repo: repoName,
      date: pushEvent.created_at,
      url: `https://github.com/${pushEvent.repo.name}`,
    }
  } catch {
    return null
  }
}

// ─── Main export ─────────────────────────────────────────────────────────────

export async function fetchGitHubData(login: string): Promise<GitHubData> {
  const now = new Date()
  const oneYearAgo = new Date(now)
  oneYearAgo.setDate(now.getDate() - 364)

  const [gqlData, latestCommit] = await Promise.all([
    graphql<GQLData>(PROFILE_AND_CONTRIBUTIONS_QUERY, {
      login,
      from: oneYearAgo.toISOString(),
      to: now.toISOString(),
    }),
    fetchLatestCommit(login),
  ])

  const { user } = gqlData

  // ── Perfil ──────────────────────────────────────────────────────────────────
  const totalStars = user.repositories.nodes.reduce(
    (sum, repo) => sum + repo.stargazerCount,
    0,
  )

  const profile: GitHubProfile = {
    name: user.name || user.login,
    login: user.login,
    avatarUrl: user.avatarUrl,
    followers: user.followers.totalCount,
    publicRepos: user.repositories.totalCount,
    totalStars,
  }

  // ── Linguagens (por bytes de código) ────────────────────────────────────────
  const langBytes: Record<string, number> = {}

  for (const repo of user.repositories.nodes) {
    for (const edge of repo.languages.edges) {
      const name = edge.node.name
      langBytes[name] = (langBytes[name] ?? 0) + edge.size
    }
  }

  const totalBytes = Object.values(langBytes).reduce((s, n) => s + n, 0)
  const TOP_N = 5

  const languages: LanguageStat[] = Object.entries(langBytes)
    .sort(([, a], [, b]) => b - a)
    .slice(0, TOP_N)
    .map(([name, bytes]) => ({
      name,
      percentage: Math.round((bytes / totalBytes) * 100),
      colorClass: langColor(name),
    }))

  // ── Contribution Map ─────────────────────────────────────────────────────────
  const contributionMap: ContributionMap = {}
  const calendar = user.contributionsCollection.contributionCalendar

  for (const week of calendar.weeks) {
    for (const day of week.contributionDays) {
      if (day.contributionCount > 0) {
        contributionMap[day.date] = day.contributionCount
      }
    }
  }

  return {
    profile,
    languages,
    latestCommit,
    contributionMap,
    totalContributions: calendar.totalContributions,
  }
}
