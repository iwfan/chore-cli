import type { FeatureSetup, IsSkipFeature } from '../../types'
import { resolve } from 'path'
import { BUILD_TOOLS } from '../typescript/build-tools'
import { addDevDeps } from '../../core/dependency'
import { rederTemplate } from '../../core/template'
import { fileExists } from '../../utils/path_helper'

export const isSkip: IsSkipFeature = async ({ rootPath, answers }) => {
  return (
    answers.buildTool !== BUILD_TOOLS.ROLLUP ||
    (await fileExists(resolve(rootPath, 'rollup.config.ts')))
  )
}

export const setup: FeatureSetup = async context => {
  const { rootPath } = context

  addDevDeps([
    'rollup',
    '@rollup/plugin-babel',
    '@rollup/plugin-node-resolve',
    '@rollup/plugin-commonjs'
  ])

  await rederTemplate(
    resolve(rootPath, 'rollup.config.ts'),
    resolve(__dirname, './templates/rollup.config.ts.tpl')
  )
}
