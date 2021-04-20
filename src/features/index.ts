import inquirer from 'inquirer'
import type { FeatureModule, FeatureContext } from '../types'
import * as npmPackageFeature from './npm_package_info'

const featureCollection: FeatureModule[] = [npmPackageFeature]

export const askQuestion = async (context: FeatureContext) => {
  for (const featureModule of featureCollection) {
    if (typeof featureModule.questionBuilder === 'function') {
      const questions = await featureModule.questionBuilder(context)
      const answers = await inquirer.prompt(questions)
      context.answers = Object.assign({}, context.answers, answers)
    }
  }
}

export const runTask = async (context: FeatureContext) => {
  for (const featureModule of featureCollection) {
    let isSkiped = false
    if (typeof featureModule.isSkip === 'function') {
      isSkiped = await featureModule.isSkip(context)
    }

    if (!isSkiped) {
      await featureModule.setup(context)
    }
  }

  return {}
}
