import type { FeatureSetup, IsSkipFeature } from '../../types'
import { resolve } from 'path'
import { BUILD_TOOLS } from '../typescript/build-tools'
import { addDep, addDevDeps } from '../../core/dependency'
import { rederTemplate } from '../../core/template'
import { fileExists } from '../../utils/path_helper'

const configFileExists = async (path: string) => await fileExists(resolve(path, '.babelrc'))

export const isSkip: IsSkipFeature = async ({ rootPath, answers }) => {
  return (
    (await configFileExists(rootPath)) ||
    [BUILD_TOOLS.TSC, BUILD_TOOLS.ESBUILD].includes(answers.buildTool)
  )
}

export const setup: FeatureSetup = async context => {
  const { rootPath, answers } = context
  const { isReactNeeded } = answers

  addDevDeps([
    '@babel/cli',
    '@babel/core',
    '@babel/preset-env',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/preset-typescript',
    '@babel/plugin-transform-runtime'
  ])

  addDep('@babel/runtime')

  if (isReactNeeded) {
    addDevDeps(['@babel/preset-react'])
  }

  await rederTemplate(
    resolve(rootPath, '.babelrc'),
    resolve(__dirname, './templates/.babelrc.tpl'),
    {
      isReactNeeded,
      __prettier_parser: 'json-stringify'
    }
  )
}
