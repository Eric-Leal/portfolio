import { fetchGitHubData } from '@/lib/github'
import type { GitHubData } from '@/lib/github'
import { GithubPageContent } from './_content'

//  Fallback (quando GITHUB_USERNAME não está configurado)

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

//  Page

export default async function GithubPage() {
  const login = process.env.GITHUB_USERNAME

  const data = login
    ? await fetchGitHubData(login).catch((err) => {
        console.error('[GithubPage]', err)
        return EMPTY_DATA
      })
    : EMPTY_DATA

  return <GithubPageContent data={data} />
}
