import type { FeatureSetup, IsSkipFeature } from '../../types'
import { resolve } from 'path'
import { rederTemplate } from '../../core/template'
import { addDevDeps } from '../../core/dependency'
import { lstat, pathExists } from 'fs-extra'

export const isSkip: IsSkipFeature = async ({ rootPath }) => {
  const gitFolderPath = resolve(rootPath, '.git')
  const hasGitFolder =
    (await pathExists(gitFolderPath)) && (await lstat(gitFolderPath)).isDirectory()

  return !hasGitFolder
}

export const setup: FeatureSetup = async context => {
  const { rootPath } = context

  addDevDeps(['husky', 'lint-staged', '@commitlint/config-conventional', '@commitlint/cli'])

  await rederTemplate(
    resolve(rootPath, '.husky', 'commit-msg'),
    resolve(__dirname, './templates/commit-msg.tpl')
  )

  await rederTemplate(
    resolve(rootPath, '.husky', 'pre-commit'),
    resolve(__dirname, './templates/pre-commit.tpl')
  )

  await rederTemplate(
    resolve(rootPath, '.husky', '.gitignore'),
    resolve(__dirname, './templates/.gitignore.tpl')
  )
}
