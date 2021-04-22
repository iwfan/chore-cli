import type { FeatureSetup, IsSkipFeature } from '../../types'
import { resolve } from 'path'
import { BUILD_TOOLS } from '../typescript/build-tools'
import { addDevDeps } from '../../core/dependency'
import { rederTemplate } from '../../core/template'

export const isSkip: IsSkipFeature = async ({ answers }) => {
  return answers.buildTool === BUILD_TOOLS.TSC
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
    '@babel/preset-typescript'
  ])

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
