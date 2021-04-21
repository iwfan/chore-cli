import type { FeatureSetup, IsSkipFeature } from '../../types'
import { resolve } from 'path'
import { fileExists } from '../../utils/path_helper'
import { rederTemplate } from '../../core/template'
import { addDevDeps } from '../../core/dependency'

export const isSkip: IsSkipFeature = async context => {
  return await fileExists(resolve(context.rootPath, 'jest.config.ts'))
}

export const setup: FeatureSetup = async context => {
  const { rootPath } = context

  addDevDeps(['jest', 'ts-jest', '@types/jest'])

  await rederTemplate(
    resolve(rootPath, 'jest.config.ts'),
    resolve(__dirname, './templates/jest.config.ts.tpl')
  )
}
