import type { FeatureSetup, IsSkipFeature, QuestionBuilder } from '../../types'
import { basename, resolve } from 'path'
import { getGitInfo } from '../../utils/git_info'
import { fileExists } from '../../utils/path_helper'
import { buildInputQuestion } from '../../core/question'
import { rederTemplate } from '../../core/template'
import { BUILD_TOOLS } from '../typescript/build-tools'
import { lstat, pathExists } from 'fs-extra'

const packageJsonExists = async (path: string) => await fileExists(resolve(path, 'package.json'))
let hasPackageJsonExists = false

export const questionBuilder: QuestionBuilder = async context => {
  const { rootPath } = context
  const hasPackageFile = await packageJsonExists(rootPath)
  if (hasPackageFile) {
    hasPackageJsonExists = true
    return
  }

  const packageName = basename(rootPath)
  const gitInfo = await getGitInfo()

  const askPackageName = buildInputQuestion('packageName', '📦 package name?', packageName)

  const askAuthor = buildInputQuestion(
    'author',
    '👤 Author?',
    gitInfo.username ? `${gitInfo.username} <${gitInfo.email}>` : ''
  )

  const askRepository = buildInputQuestion('repoUrl', '🌎 repository url?', gitInfo.repoUrl ?? '')

  const askLicense = buildInputQuestion('license', '📝 license?', 'ISC')

  return [askPackageName, askAuthor, askRepository, askLicense]
}

export const isSkip: IsSkipFeature = async () => {
  return hasPackageJsonExists
}

export const setup: FeatureSetup = async context => {
  const { rootPath, answers } = context
  const { packageName, author, repoUrl, license, buildTool } = answers

  const gitFolderPath = resolve(rootPath, '.git')
  const hasGitFolder =
    (await pathExists(gitFolderPath)) && (await lstat(gitFolderPath)).isDirectory()

  await rederTemplate(
    resolve(rootPath, 'package.json'),
    resolve(__dirname, './templates/package.json.tpl'),
    {
      packageName,
      author,
      repoUrl,
      license,
      useTypeScriptCompiler: buildTool === BUILD_TOOLS.TSC,
      hasGitFolder,
      __prettier_parser: 'json-stringify'
    }
  )
}
