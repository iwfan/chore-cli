import type { FeatureSetup, IsSkipFeature, QuestionBuilder } from '../../types'
import { resolve } from 'path'
import { fileExists } from '../../utils/path_helper'
import { rederTemplate } from '../../core/template'
import { buildTools } from './build-tools'

export const questionBuilder: QuestionBuilder = async () => {
  return buildTools()
}

export const isSkip: IsSkipFeature = async context => {
  return await fileExists(resolve(context.rootPath, 'tsconfig.json'))
}

export const setup: FeatureSetup = async context => {
  const {
    rootPath,
    answers: { isReactNeeded }
  } = context
  await rederTemplate(
    resolve(rootPath, 'tsconfig.json'),
    resolve(__dirname, './templates/tsconfig.json.tpl'),
    {
      isReactNeeded
    }
  )
}
