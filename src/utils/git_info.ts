import { execSync } from 'child_process'

export interface GitInfo {
  username: string | null
  email: string | null
  repoUrl: string | null
}

export function readStdout(cmd: string) {
  try {
    const stdout = execSync(cmd)
    return stdout.toString().replace('\n', '')
  } catch (e) {
    return null
  }
}

export function getGitUserName() {
  return readStdout(`git config --get user.name`)
}

export function getGitUserEmail() {
  return readStdout(`git config --get user.email`)
}

export function getGitReposUrl() {
  return readStdout(`git config --get remote.origin.url`)
}

export function getGitInfo(): GitInfo {
  return {
    username: getGitUserName(),
    email: getGitUserEmail(),
    repoUrl: transformGitUrlToGithubsUrl(getGitReposUrl())
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
