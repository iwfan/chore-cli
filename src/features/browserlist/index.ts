import type { FeatureSetup, IsSkipFeature, QuestionBuilder } from '../../types'
import { resolve } from 'path'
import { fileExists } from '../../utils/path_helper'
import { buildConfirmQuestion } from '../../core/question'
import { rederTemplate } from '../../core/template'

export const questionBuilder: QuestionBuilder = async context => {
  const skip = await isSkip(context)
  if (skip) {
    return
  }

  return buildConfirmQuestion('isBrowserListNeeded', '❓ Do you need to use BrowserList?', false)
}

export const isSkip: IsSkipFeature = async context => {
  return await fileExists(resolve(context.rootPath, '.browserslistrc'))
}

export const setup: FeatureSetup = async context => {
  const {
    rootPath,
    answers: { isBrowserListNeeded }
  } = context

  if (isBrowserListNeeded) {
    await rederTemplate(
      resolve(rootPath, '.browserslistrc'),
      resolve(__dirname, 'templates', '.browserslistrc.tpl')
    )
  }
}
