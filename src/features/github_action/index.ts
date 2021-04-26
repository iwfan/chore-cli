import type { FeatureSetup, IsSkipFeature, QuestionBuilder } from '../../types'
import { resolve } from 'path'
import { buildConfirmQuestion } from '../../core/question'
import { rederTemplate } from '../../core/template'
import { PackageManager } from '../deps_install'

export const questionBuilder: QuestionBuilder = async () => {
  return buildConfirmQuestion('isGithubActionNeeded', '❓ Do you need to use Github Action?', false)
}

export const isSkip: IsSkipFeature = async context => {
  return !context.answers.isGithubActionNeeded
}

export const setup: FeatureSetup = async context => {
  const {
    rootPath,
    answers: { packageName, packageManager }
  } = context

  const data = {
    useNpm: packageManager === PackageManager.NPM,
    useYarn: packageManager === PackageManager.YARN,
    usePnpm: packageManager === PackageManager.PNPM,
    __prettier_parser: 'yaml'
  }

  await rederTemplate(
    resolve(rootPath, '.github', 'workflows', 'ci-workflow.yml'),
    resolve(__dirname, 'templates', 'ci-workflow.yml.tpl'),
    data
  )

  await rederTemplate(
    resolve(rootPath, '.github', 'workflows', 'cd-workflow.yml'),
    resolve(__dirname, 'templates', 'cd-workflow.yml.tpl'),
    {
      packageName,
      ...data
    }
  )
}
