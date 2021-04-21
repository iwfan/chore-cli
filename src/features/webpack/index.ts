import type { FeatureSetup, IsSkipFeature } from '../../types'
import { resolve } from 'path'
import { BUILD_TOOLS } from '../typescript/build-tools'
import { addDevDeps } from '../../core/dependency'
import { rederTemplate } from '../../core/template'
import { fileExists } from '../../utils/path_helper'

export const isSkip: IsSkipFeature = async ({ rootPath, answers }) => {
  return (
    answers.buildTool !== BUILD_TOOLS.WEBPACK ||
    (await fileExists(resolve(rootPath, 'webpack.config.ts')))
  )
}

export const setup: FeatureSetup = async context => {
  const { rootPath } = context

  addDevDeps([
    'webpack',
    'webpack-cli',
    'webpack-dev-server',
    '@types/webpack',
    '@types/webpack-dev-server',
    'html-webpack-plugin',
    '@types/html-webpack-plugin',
    'babel-loader',
    'ts-node'
  ])

  await rederTemplate(
    resolve(rootPath, 'webpack.config.ts'),
    resolve(__dirname, './templates/webpack.config.ts.tpl')
  )

  await rederTemplate(
    resolve(rootPath, 'public', 'index.html'),
    resolve(__dirname, './templates/index.html.tpl'),
    {
      title: '<%= htmlWebpackPlugin.options.title %>'
    }
  )
}
