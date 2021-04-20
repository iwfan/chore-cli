import type { FeatureSetup, IsSkipFeature, QuestionBuilder } from '../../types'
import { basename, resolve } from 'path'
import ejs from 'ejs'
import fs from 'fs-extra'
import { getGitInfo } from '../../utils/git_info'
import { fileExists } from '../../utils/path_helper'

const packageJsonExists = async (path: string) => await fileExists(resolve(path, 'package.json'))
let hasPackageJsonExists = false

export const questionBuilder: QuestionBuilder = async context => {
  const { rootPath } = context
  const hasPackageFile = await packageJsonExists(rootPath)
  if (hasPackageFile) {
    hasPackageJsonExists = true
    return []
  }

  const packageName = basename(rootPath)
  const gitInfo = getGitInfo()

  const askPackageName = {
    type: 'input',
    name: 'packageName',
    message: '📦 package name?',
    default: packageName
  }

  const askAuthor = {
    type: 'input',
    name: 'author',
    message: '👤 Author?',
    default: gitInfo.username ? `${gitInfo.username} <${gitInfo.email}>` : ''
  }

  const askRepository = {
    type: 'input',
    name: 'repoUrl',
    message: '🌎 repository url?',
    default: gitInfo.repoUrl ?? ''
  }

  const askLicense = {
    type: 'input',
    name: 'license',
    message: '📝 license?',
    default: 'ISC'
  }

  return [askPackageName, askAuthor, askRepository, askLicense]
}

export const isSkip: IsSkipFeature = async () => {
  return hasPackageJsonExists
}

export const setup: FeatureSetup = async context => {
  const { rootPath, answers } = context
  const { packageName, author, repoUrl, license } = answers

  const content = await ejs.renderFile(resolve(__dirname, './templates/package.json.tpl'), {
    packageName,
    author,
    repoUrl,
    license
  })

  const filePath = resolve(rootPath, 'package.json')
  await fs.ensureFile(filePath)
  await fs.writeFile(filePath, content)
}
