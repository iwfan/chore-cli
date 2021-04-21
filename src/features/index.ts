import type { FeatureModule, FeatureContext } from '../types'
import inquirer from 'inquirer'
import { withSpinner } from '../utils/with_spinner'
import * as typescriptFeature from './typescript'
import * as npmPackageFeature from './npm_package_info'
import * as editorConfigFeature from './editorconfig'
import * as reactFeature from './react'
import * as browserListFeature from './browserlist'
import * as huskyFeature from './husky'
import * as babelFeature from './babel'
import * as prettierFeature from './prettier'
import * as eslintFeature from './eslint'
import * as depsInstallFeature from './deps_install'

const featureCollection: FeatureModule[] = [
  typescriptFeature,
  npmPackageFeature,
  editorConfigFeature,
  reactFeature,
  browserListFeature,
  huskyFeature,
  babelFeature,
  prettierFeature,
  eslintFeature
]

const askModuleQuestion = async (featureModule: FeatureModule, context: FeatureContext) => {
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

export const askQuestion = async (context: FeatureContext) => {
  for (const featureModule of featureCollection) {
    await askModuleQuestion(featureModule, context)
  }
}

export const runTask = async (context: FeatureContext) => {
  await withSpinner(
    async () => {
      for (const featureModule of featureCollection) {
        let isSkiped = false
        if (typeof featureModule.isSkip === 'function') {
          isSkiped = await featureModule.isSkip(context)
        }

        if (!isSkiped) {
          await featureModule.setup(context)
        }
      }
    },
    {
      start: '👷 Building infrastructure',
      success: '🏗  The development infrastructure generated.',
      failed: `🚨 Failed to generate development environment infrastructure.`
    }
  ).catch()

  await askModuleQuestion(depsInstallFeature, context)
  await depsInstallFeature.setup(context)
}
