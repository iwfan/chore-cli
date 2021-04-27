import type { FeatureSetup, IsSkipFeature } from '../../types'
import { resolve } from 'path'
import { rederTemplate } from '../../core/template'
import { addDevDeps } from '../../core/dependency'
import { BUILD_TOOLS } from '../typescript/build-tools'

export const isSkip: IsSkipFeature = async ({ answers: { buildTool } }) => {
  return buildTool !== BUILD_TOOLS.ESBUILD
}

export const setup: FeatureSetup = async context => {
  const { rootPath } = context

  addDevDeps(['esbuild', 'glob', '@types/glob', 'ts-node', 'fs-extra'])

  await rederTemplate(
    resolve(rootPath, 'scripts', 'build.ts'),
    resolve(__dirname, './templates/build.ts.tpl')
  )
}
