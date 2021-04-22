import type { FeatureSetup, IsSkipFeature } from '../../types'
import { resolve } from 'path'
import { rederTemplate } from '../../core/template'
import { fileExists } from '../../utils/path_helper'

export const isSkip: IsSkipFeature = async ({ rootPath }) => {
  return await fileExists(resolve(rootPath, 'src', 'index.ts'))
}

export const setup: FeatureSetup = async context => {
  const { rootPath } = context

  await rederTemplate(
    resolve(rootPath, 'src', 'index.ts'),
    resolve(__dirname, './templates/index.ts.tpl')
  )

  await rederTemplate(
    resolve(rootPath, 'tests', 'index.spec.ts'),
    resolve(__dirname, './templates/index.spec.ts.tpl')
  )
}
