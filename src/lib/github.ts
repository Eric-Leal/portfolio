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

const FETCH_OPTIONS = { next: { revalidate: 3660 } } as const

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

type RestPushEvent = {
  type: string
  public?: boolean
  created_at: string
  repo: {
    name: string
  }
  payload: {
    commits?: Array<{
      sha: string
      message: string
    }>
  } | null
}

type RestAuthRepo = {
  full_name: string
  name: string
  private: boolean
  default_branch: string
  pushed_at: string
}

type RestRepoCommit = {
  html_url: string
  commit: {
    message: string
    committer: {
      date: string
    } | null
    author: {
      date: string
    } | null
  }
}

function commitUrlFromRepoAndSha(repoFullName: string, sha: string): string {
  return `https://github.com/${repoFullName}/commit/${sha}`
}

async function fetchLatestCommitFromEvents(
  login: string,
  includePrivate: boolean,
): Promise<LatestCommit | null> {
  const path = includePrivate
    ? `/users/${login}/events?per_page=100`
    : `/users/${login}/events/public?per_page=100`

  try {
    const events = await restGet<RestPushEvent[]>(path)

    const pushEvent = events.find(
      (event) =>
        event.type === 'PushEvent' &&
        Array.isArray(event.payload?.commits) &&
        event.payload!.commits!.length > 0,
    )

    if (!pushEvent?.payload?.commits?.length) {
      return null
    }

    // GitHub Events usually list commits in push order; the last one is the newest.
    const commit =
      pushEvent.payload.commits[pushEvent.payload.commits.length - 1]
    const repoName = pushEvent.repo.name.split('/').pop() ?? pushEvent.repo.name

    return {
      message: commit.message.split('\n')[0],
      repo: repoName,
      date: pushEvent.created_at,
      url: commitUrlFromRepoAndSha(pushEvent.repo.name, commit.sha),
      isPrivate: pushEvent.public === false,
    }
  } catch {
    return null
  }
}

async function fetchLatestCommitFromOwnedRepos(
  login: string,
): Promise<LatestCommit | null> {
  if (!process.env.GITHUB_TOKEN) return null

  try {
    const viewer = await restGet<RestUser>('/user')
    if (viewer.login.toLowerCase() !== login.toLowerCase()) {
      return null
    }

    const repos = await restGet<RestAuthRepo[]>(
      '/user/repos?affiliation=owner&sort=pushed&direction=desc&per_page=30',
    )

    for (const repo of repos) {
      if (!repo.default_branch) continue

      const commits = await restGet<RestRepoCommit[]>(
        `/repos/${repo.full_name}/commits?sha=${repo.default_branch}&per_page=1`,
      )

      const latest = commits[0]
      if (!latest) continue

      const date =
        latest.commit.committer?.date ??
        latest.commit.author?.date ??
        repo.pushed_at

      return {
        message: latest.commit.message.split('\n')[0],
        repo: repo.name,
        date,
        url: latest.html_url,
        isPrivate: repo.private,
      }
    }

    return null
  } catch {
    return null
  }
}

async function fetchLatestCommit(login: string): Promise<LatestCommit | null> {
  if (process.env.GITHUB_TOKEN) {
    const latestWithPrivate = await fetchLatestCommitFromEvents(login, true)
    if (latestWithPrivate) return latestWithPrivate

    const latestFromRepos = await fetchLatestCommitFromOwnedRepos(login)
    if (latestFromRepos) return latestFromRepos
  }

  return fetchLatestCommitFromEvents(login, false)
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
          } | null> | null
        } | null
      } | null>
    }
  } | null
}

const EMPTY_GQL_DATA: GQLData = {
  user: {
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: 0,
        weeks: [],
      },
    },
    repositories: {
      nodes: [],
    },
  },
}

async function gqlContribsRequest(
  login: string,
  useAuth: boolean,
): Promise<{ data: GQLData; errors?: unknown[] } | null> {
  const now = new Date()
  const oneYearAgo = new Date(now)
  oneYearAgo.setDate(now.getDate() - 364)

  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  }

  if (useAuth && process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const res = await fetch(GITHUB_GRAPHQL, {
    method: 'POST',
    headers,
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

  if (!res.ok) return null

  return (await res.json()) as { data: GQLData; errors?: unknown[] }
}

async function fetchContribsAndLanguages(login: string): Promise<GQLData> {
  try {
    const withAuth = await gqlContribsRequest(login, true)

    if (withAuth?.data?.user) {
      return withAuth.data
    }

    // If token is missing/invalid, retry without auth for public profile data.
    if (withAuth?.errors?.length) {
      console.warn(
        '[github] GraphQL auth query failed, retrying unauthenticated',
      )
    }

    const withoutAuth = await gqlContribsRequest(login, false)

    if (withoutAuth?.errors?.length) {
      console.warn('[github] GraphQL public query returned errors')
    }

    return withoutAuth?.data?.user ? withoutAuth.data : EMPTY_GQL_DATA
  } catch {
    return EMPTY_GQL_DATA
  }
}

//  Main export

export async function fetchGitHubData(login: string): Promise<GitHubData> {
  const [restUser, repos, gqlData, latestCommit] = await Promise.all([
    restGet<RestUser>(`/users/${login}`),
    fetchAllRepos(login),
    fetchContribsAndLanguages(login).catch(() => EMPTY_GQL_DATA),
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
  const user = gqlData.user

  for (const repo of user?.repositories?.nodes ?? []) {
    const edges = repo?.languages?.edges ?? []

    for (const edge of edges) {
      if (!edge?.node?.name) continue
      const name = edge.node.name
      langBytes[name] = (langBytes[name] ?? 0) + edge.size
    }
  }

  const totalBytes = Object.values(langBytes).reduce((s, n) => s + n, 0)

  const languages: LanguageStat[] =
    totalBytes > 0
      ? Object.entries(langBytes)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([name, bytes]) => ({
            name,
            percentage: Math.round((bytes / totalBytes) * 100),
            colorClass: langColor(name),
          }))
      : []

  //  Contribution Map
  const contributionMap: ContributionMap = {}
  const calendar = user?.contributionsCollection?.contributionCalendar

  for (const week of calendar?.weeks ?? []) {
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
    totalContributions: calendar?.totalContributions ?? 0,
  }
}
