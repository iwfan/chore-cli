import type { FeatureSetup, IsSkipFeature } from '../../types'
import { resolve } from 'path'
import { BUILD_TOOLS } from '../typescript/build-tools'
import { addDevDeps } from '../../core/dependency'
import { rederTemplate } from '../../core/template'
import { fileExists } from '../../utils/path_helper'

export const isSkip: IsSkipFeature = async ({ rootPath, answers }) => {
  return (
    answers.buildTool !== BUILD_TOOLS.SNOWPACK ||
    (await fileExists(resolve(rootPath, 'snowpack.config.js')))
  )
}

export const setup: FeatureSetup = async context => {
  const { rootPath } = context

  addDevDeps(['snowpack', '@snowpack/plugin-typescript'])

  await rederTemplate(
    resolve(rootPath, 'snowpack.config.js'),
    resolve(__dirname, './templates/snowpack.config.js.tpl')
  )
}
