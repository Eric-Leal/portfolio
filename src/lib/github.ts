//  GitHub API Client
// Estratégia mista:
//   REST   perfil, lista de repos (estrelas), último commit via Events
//   GraphQL  heatmap de contribuições + linguagens (mais eficiente que REST aqui)

const GITHUB_API = 'https://api.github.com'
const GITHUB_GRAPHQL = 'https://api.github.com/graphql'

//  Types

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
  colorClass: string
}

export type LatestCommit = {
  message: string
  repo: string
  date: string // ISO string
  url: string
  isPrivate: boolean
}

export type ContributionMap = Record<string, number> // { "YYYY-MM-DD": count }

export type GitHubData = {
  profile: GitHubProfile
  languages: LanguageStat[]
  latestCommit: LatestCommit | null
  contributionMap: ContributionMap
  totalContributions: number
}

//  Helpers

function authHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN
  return {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

const FETCH_OPTIONS = { next: { revalidate: 60 } } as const
const COMMIT_FETCH_OPTIONS = { next: { revalidate: 60 } } as const

async function restGet<T>(path: string): Promise<T> {
  const res = await fetch(`${GITHUB_API}${path}`, {
    headers: authHeaders(),
    ...FETCH_OPTIONS,
  })
  if (!res.ok) {
    throw new Error(`GitHub REST ${path}  ${res.status} ${res.statusText}`)
  }
  return res.json() as Promise<T>
}

//  Language color mapping

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

//  REST: perfil

type RestUser = {
  login: string
  name: string | null
  avatar_url: string
  followers: number
  public_repos: number
}

//  REST: repositórios (para somar estrelas)

type RestRepo = {
  name: string
  fork: boolean
  stargazers_count: number
  language: string | null
}

async function fetchAllRepos(login: string): Promise<RestRepo[]> {
  const allRepos: RestRepo[] = []
  let page = 1

  while (true) {
    const batch = await restGet<RestRepo[]>(
      `/users/${login}/repos?type=owner&per_page=100&page=${page}`,
    )
    if (batch.length === 0) break
    allRepos.push(...batch)
    if (batch.length < 100) break
    page++
  }

  return allRepos
}

const LATEST_COMMIT_QUERY = /* graphql */ `
  query LatestCommit {
    viewer {
      repositories(
        first: 10
        isFork: false
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        nodes {
          name
          url
          pushedAt
          isPrivate
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 10) {
                  nodes {
                    message
                    committedDate
                    url
                    author {
                      user {
                        login
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

type GQLLatestCommit = {
  viewer: {
    repositories: {
      nodes: Array<{
        name: string
        url: string
        pushedAt: string
        isPrivate: boolean
        defaultBranchRef: {
          target: {
            history: {
              nodes: Array<{
                message: string
                committedDate: string
                url: string
                author: {
                  user: { login: string } | null
                } | null
              }>
            }
          }
        } | null
      }>
    }
  }
}

async function fetchLatestCommit(login: string): Promise<LatestCommit | null> {
  try {
    const res = await fetch(GITHUB_GRAPHQL, {
      method: 'POST',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: LATEST_COMMIT_QUERY,
        variables: {},
      }),
      ...COMMIT_FETCH_OPTIONS,
    })

    if (!res.ok) return null

    const json = (await res.json()) as {
      data: GQLLatestCommit
      errors?: unknown[]
    }
    if (json.errors?.length)
      console.error('[github] latest commit errors:', json.errors)

    const repos = json.data?.viewer?.repositories?.nodes ?? []

    for (const repo of repos) {
      const commits = repo.defaultBranchRef?.target?.history?.nodes ?? []
      const commit = commits.find((c) => c.author?.user?.login === login)
      if (!commit) continue

      return {
        message: commit.message.split('\n')[0],
        repo: repo.name,
        date: commit.committedDate,
        url: commit.url,
        isPrivate: repo.isPrivate,
      }
    }

    return null
  } catch {
    return null
  }
}

//  GraphQL: contribuições + linguagens por bytes

const CONTRIBUTIONS_AND_LANGUAGES_QUERY = /* graphql */ `
  query ContribAndLangs($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
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

      repositories(
        first: 100
        privacy: PUBLIC
        isFork: false
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        nodes {
          languages(first: 8, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node { name }
            }
          }
        }
      }
    }
  }
`

type GQLData = {
  user: {
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
    repositories: {
      nodes: Array<{
        languages: {
          edges: Array<{
            size: number
            node: { name: string }
          }>
        }
      }>
    }
  }
}

async function fetchContribsAndLanguages(login: string): Promise<GQLData> {
  const now = new Date()
  const oneYearAgo = new Date(now)
  oneYearAgo.setDate(now.getDate() - 364)

  const res = await fetch(GITHUB_GRAPHQL, {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: CONTRIBUTIONS_AND_LANGUAGES_QUERY,
      variables: {
        login,
        from: oneYearAgo.toISOString(),
        to: now.toISOString(),
      },
    }),
    ...FETCH_OPTIONS,
  })

  if (!res.ok) {
    throw new Error(`GitHub GraphQL error: ${res.status} ${res.statusText}`)
  }

  const json = (await res.json()) as { data: GQLData; errors?: unknown[] }

  if (json.errors?.length) {
    console.error('[github] GraphQL errors:', json.errors)
  }

  return json.data
}

//  Main export

export async function fetchGitHubData(login: string): Promise<GitHubData> {
  const [restUser, repos, gqlData, latestCommit] = await Promise.all([
    restGet<RestUser>(`/users/${login}`),
    fetchAllRepos(login),
    fetchContribsAndLanguages(login),
    fetchLatestCommit(login),
  ])

  //  Perfil
  // Estrelas somadas de todos os repos próprios (incluindo forks, igual ao GitHub)
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0)

  const profile: GitHubProfile = {
    name: restUser.name ?? restUser.login,
    login: restUser.login,
    avatarUrl: restUser.avatar_url,
    followers: restUser.followers,
    publicRepos: restUser.public_repos, // número exato retornado diretamente pelo GitHub
    totalStars,
  }

  //  Linguagens (por bytes de código, via GraphQL)
  const langBytes: Record<string, number> = {}

  for (const repo of gqlData.user.repositories.nodes) {
    for (const edge of repo.languages.edges) {
      const name = edge.node.name
      langBytes[name] = (langBytes[name] ?? 0) + edge.size
    }
  }

  const totalBytes = Object.values(langBytes).reduce((s, n) => s + n, 0)

  const languages: LanguageStat[] = Object.entries(langBytes)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, bytes]) => ({
      name,
      percentage: Math.round((bytes / totalBytes) * 100),
      colorClass: langColor(name),
    }))

  //  Contribution Map
  const contributionMap: ContributionMap = {}
  const calendar = gqlData.user.contributionsCollection.contributionCalendar

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
