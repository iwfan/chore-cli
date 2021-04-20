import { resolve } from 'path'
import { ensureUsabilityOfPath } from './utils/path_helper'
import * as featureModule from './features'
import type { FeatureContext } from './types'
import inquirer from 'inquirer'

export async function main(projectPath: string) {
  const resolvedPath = resolve(projectPath)
  await ensureUsabilityOfPath(resolvedPath)

  const context: FeatureContext = { rootPath: resolvedPath, answers: {} }
  const questions = await featureModule.questionBuilder(context)
  const answer = await inquirer.prompt(questions)
  console.log(answer)
}
