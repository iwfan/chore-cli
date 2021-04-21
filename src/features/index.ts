import inquirer from 'inquirer'
import type { FeatureModule, FeatureContext } from '../types'
import * as typescriptFeature from './typescript'
import * as npmPackageFeature from './npm_package_info'
import * as editorConfigFeature from './editorconfig'
import * as reactFeature from './react'
import * as browserListFeature from './browserlist'
import * as eslintFeature from './eslint'

const featureCollection: FeatureModule[] = [
  typescriptFeature,
  npmPackageFeature,
  editorConfigFeature,
  reactFeature,
  browserListFeature,
  eslintFeature
]

export const askQuestion = async (context: FeatureContext) => {
  for (const featureModule of featureCollection) {
    if (typeof featureModule.questionBuilder === 'function') {
      const questions = await featureModule.questionBuilder(context)
      if (questions != null) {
        const answers = await inquirer.prompt(
          Array.isArray(questions) ? questions : [questions],
          context.answers
        )
        context.answers = Object.assign({}, context.answers, answers)
      }
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
