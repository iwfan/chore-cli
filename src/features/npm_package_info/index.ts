import type { FeatureSetup, QuestionBuilder } from '../../types'
import { basename, resolve } from 'path'
import ejs from 'ejs'
import { getGitInfo } from '../../utils/git_info'
import { fileExists } from '../../utils/path_helper'

export const templates = [resolve(__dirname, './templates/package.json.tpl')]

export const a = async () => {
  const appName = basename('/Users/f/Documents/github_repo/chore-cli/src/abc')

  const data = await ejs.renderFile(resolve(__dirname, './templates/package.json.tpl'), {
    projectName: appName,
    username: '123',
    email: '123',
    repoUrl: '4567'
  })
  console.log(data)
}

export const questionBuilder: QuestionBuilder = async context => {
  const { rootPath } = context
  const hasPackageFile = await fileExists(resolve(rootPath, 'package.json'))
  if (hasPackageFile) return []

  const appName = basename(rootPath)
  const gitInfo = getGitInfo()

  const askPackageName = {
    type: 'input',
    name: 'packageName',
    message: '📦 package name?',
    default: appName
  }

  const askLicense = {
    type: 'input',
    name: 'license',
    message: '📝 license?',
    default: 'ISC'
  }

  const askAuthor = {
    type: 'input',
    name: 'author',
    message: '👤 Author?',
    default: gitInfo.username ? `${gitInfo.username} <${gitInfo.email}>` : ''
  }

  const askRepository = {
    type: 'input',
    name: 'author',
    message: '👤 repository url?',
    default: gitInfo.repoUrl ?? ''
  }

  return [askPackageName, askAuthor, askRepository, askLicense]
}

export const setup: FeatureSetup = async () => {
  return {}
}
