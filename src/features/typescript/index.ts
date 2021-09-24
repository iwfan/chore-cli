import type { FeatureSetup, IsSkipFeature, QuestionBuilder } from '../../types'
import { resolve } from 'path'
import { fileExists } from '../../utils/path_helper'
import { rederTemplate } from '../../core/template'
import { buildTools, BUILD_TOOLS } from './build-tools'
import { addDep, addDevDeps } from '../../core/dependency'

export const questionBuilder: QuestionBuilder = async () => {
  return buildTools()
}

export const isSkip: IsSkipFeature = async context => {
  return await fileExists(resolve(context.rootPath, 'tsconfig.json'))
}

export const setup: FeatureSetup = async context => {
  const {
    rootPath,
    answers: { isReactNeeded, buildTool }
  } = context

  addDep('tslib')
  addDevDeps(['typescript', 'typedoc', 'ts-node'])

  await rederTemplate(
    resolve(rootPath, 'tsconfig.json'),
    resolve(__dirname, './templates/tsconfig.json.tpl'),
    {
      isReactNeeded,
      useRoolup: buildTool === BUILD_TOOLS.ROLLUP
    }
  )
}
