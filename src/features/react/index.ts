import type { FeatureSetup, IsSkipFeature, QuestionBuilder } from '../../types'
import { buildConfirmQuestion } from '../../core/question'
import { BUILD_TOOLS } from '../typescript/build-tools'
import { addDeps, addDevDeps } from '../../core/dependency'

export const questionBuilder: QuestionBuilder = async () => {
  return buildConfirmQuestion(
    'isReactNeeded',
    '❓ Do you need to use React?',
    false,
    answer => answer.buildTool !== BUILD_TOOLS.TSC
  )
}

export const isSkip: IsSkipFeature = async context => {
  return !Boolean(context.answers.isReactNeeded)
}

export const setup: FeatureSetup = async () => {
  addDeps(['react', 'react-dom'])
  addDevDeps(['@types/react', '@types/react-dom'])
}
