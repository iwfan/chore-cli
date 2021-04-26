import type { FeatureSetup, IsSkipFeature } from '../../types'
import { resolve } from 'path'
import { fileExists } from '../../utils/path_helper'
import { rederTemplate } from '../../core/template'
import { addDevDeps } from '../../core/dependency'

const configFileExists = async (path: string) => await fileExists(resolve(path, '.eslintrc'))

export const isSkip: IsSkipFeature = async ({ rootPath }) => {
  return await configFileExists(rootPath)
}

export const setup: FeatureSetup = async context => {
  const { rootPath, answers } = context
  const { isReactNeeded } = answers

  addDevDeps([
    'eslint',
    '@typescript-eslint/parser',
    '@typescript-eslint/eslint-plugin',
    'eslint-plugin-prettier',
    'eslint-config-prettier',
    'eslint-plugin-jest'
  ])

  if (isReactNeeded) {
    addDevDeps(['eslint-plugin-react', 'eslint-plugin-react-hooks'])
  }

  await rederTemplate(
    resolve(rootPath, '.eslintrc'),
    resolve(__dirname, './templates/.eslintrc.tpl'),
    {
      isReactNeeded,
      __prettier_parser: 'json-stringify'
    }
  )
}
