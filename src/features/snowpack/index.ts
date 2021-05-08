import type { FeatureSetup, IsSkipFeature } from '../../types'
import { resolve } from 'path'
import camelCase from 'lodash.camelcase'
import { BUILD_TOOLS } from '../typescript/build-tools'
import { addDevDeps } from '../../core/dependency'
import { rederTemplate } from '../../core/template'
import { fileExists } from '../../utils/path_helper'

export const isSkip: IsSkipFeature = async ({ rootPath, answers }) => {
  return (
    answers.buildTool !== BUILD_TOOLS.SNOWPACK ||
    (await fileExists(resolve(rootPath, 'snowpack.config.ts')))
  )
}

export const setup: FeatureSetup = async context => {
  const {
    rootPath,
    answers: { packageName }
  } = context

  addDevDeps([
    'snowpack',
    '@rollup/plugin-babel',
    '@rollup/plugin-node-resolve',
    '@rollup/plugin-commonjs'
  ])

  await rederTemplate(
    resolve(rootPath, 'rollup.config.ts'),
    resolve(__dirname, './templates/rollup.config.ts.tpl'),
    {
      appName: camelCase(packageName)
    }
  )
}
