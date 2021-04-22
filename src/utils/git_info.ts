import { readStdout } from './executor'

export interface GitInfo {
  username: string | null
  email: string | null
  repoUrl: string | null
}

export async function getGitUserName() {
  return await readStdout(`git config --get user.name`)
}

export async function getGitUserEmail() {
  return await readStdout(`git config --get user.email`)
}

export async function getGitReposUrl() {
  return await readStdout(`git config --get remote.origin.url`)
}

export async function getGitInfo(): Promise<GitInfo> {
  return {
    username: await getGitUserName(),
    email: await getGitUserEmail(),
    repoUrl: transformGitUrlToGithubsUrl(await getGitReposUrl())
  }
}

export function transformGitUrlToGithubsUrl(url: string | null) {
  if (!url) return null
  const removedGitProtocolUrl = url.replace('git+', '').replace('.git', '')
  const substr = removedGitProtocolUrl.slice(url.lastIndexOf(':') + 1)
  const [userName, repoName] = substr.split('/')
  if (userName && repoName) {
    return `https://github.com/${userName}/${repoName}`
  }
  return null
}
