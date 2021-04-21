import type { FeatureSetup, IsSkipFeature, QuestionBuilder } from '../../types'
import { resolve } from 'path'
import { fileExists } from '../../utils/path_helper'
import { buildConfirmQuestion } from '../../core/question'
import { rederTemplate } from '../../core/template'

const configFileExists = async (path: string) => await fileExists(resolve(path, '.eslintrc'))
let hasConfigFileExists = false

export const questionBuilder: QuestionBuilder = async context => {
  const { rootPath } = context
  const hasPackageFile = await configFileExists(rootPath)
  if (hasPackageFile) {
    hasConfigFileExists = true
    return
  }

  return buildConfirmQuestion('isReactNeeded', '❓ Do you need to use React?', false)
}

export const isSkip: IsSkipFeature = async () => {
  return hasConfigFileExists
}

export const setup: FeatureSetup = async context => {
  const { rootPath, answers } = context
  const { isReactNeeded } = answers

  await rederTemplate(
    resolve(rootPath, '.eslintrc'),
    resolve(__dirname, './templates/.eslintrc.tpl'),
    {
      isReactNeeded,
      __prettier_parser: 'json-stringify'
    }
  )
}

/*

  options.devDeps = [...options.devDeps, 'eslint'];

  options.devDeps = [
    ...options.devDeps,
    '@typescript-eslint/parser',
    '@typescript-eslint/eslint-plugin',
    'eslint-plugin-prettier',
    'eslint-config-prettier',
  ];

  if (features.includes(Feature.REACT)) {
    options.devDeps = [...options.devDeps, 'eslint-plugin-react'];
  }

*/
