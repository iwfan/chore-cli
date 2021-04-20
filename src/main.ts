import { resolve } from 'path'
import { ensureUsabilityOfPath } from './utils/path_helper'
import { askQuestion, runTask } from './features'
import type { FeatureContext } from './types'

export async function main(projectPath: string) {
  const resolvedPath = resolve(projectPath)
  await ensureUsabilityOfPath(resolvedPath)

  const context: FeatureContext = { rootPath: resolvedPath, answers: {} }
  await askQuestion(context)
  await runTask(context)
}
