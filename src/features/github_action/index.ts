import type { FeatureSetup, IsSkipFeature, QuestionBuilder } from '../../types'
import { resolve } from 'path'
import { buildConfirmQuestion } from '../../core/question'
import { rederTemplate } from '../../core/template'

export const questionBuilder: QuestionBuilder = async () => {
  return buildConfirmQuestion('isGithubActionNeeded', '❓ Do you need to use Github Action?', false)
}

export const isSkip: IsSkipFeature = async context => {
  return !Boolean(context.answers.isGithubActionNeeded)
}

export const setup: FeatureSetup = async context => {
  const { rootPath } = context

  await rederTemplate(
    resolve(rootPath, '.github', 'workflows', 'publish.yml'),
    resolve(__dirname, 'templates', 'publish.yml.tpl')
  )
}
