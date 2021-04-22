import type { FeatureSetup, IsSkipFeature, QuestionBuilder } from '../../types'
import { resolve } from 'path'
import { fileExists } from '../../utils/path_helper'
import { rederTemplate } from '../../core/template'
import { addDevDeps } from '../../core/dependency'

const configFileExists = async (path: string) => await fileExists(resolve(path, '.prettierrc'))
let hasConfigFileExists = false

export const questionBuilder: QuestionBuilder = async context => {
  const { rootPath } = context
  const hasPackageFile = await configFileExists(rootPath)
  if (hasPackageFile) {
    hasConfigFileExists = true
    return
  }
}

export const isSkip: IsSkipFeature = async () => {
  return hasConfigFileExists
}

export const setup: FeatureSetup = async context => {
  const { rootPath, answers } = context
  const { isReactNeeded } = answers

  addDevDeps(['prettier', 'pretty-quick'])

  await rederTemplate(
    resolve(rootPath, '.prettierrc'),
    resolve(__dirname, './templates/.prettierrc.tpl'),
    {
      isReactNeeded,
      __prettier_parser: 'json-stringify'
    }
  )
}
