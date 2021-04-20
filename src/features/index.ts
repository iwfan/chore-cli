import type { FeatureModule, QuestionBuilder, FeatureSetup } from '../types'
import type { Question } from 'inquirer'
import * as npmPackageFeature from './npm_package_info'

const featureCollection: FeatureModule[] = [npmPackageFeature]

export const questionBuilder: QuestionBuilder = async context => {
  const questions: Question[] = []

  for (const featureModule of featureCollection) {
    if (typeof featureModule.questionBuilder === 'function') {
      const questionList = await featureModule.questionBuilder(context)
      questions.push(...questionList)
    }
  }
  return questions
}

export const setup: FeatureSetup = async () => {
  return {}
}
