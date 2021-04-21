import type { FeatureSetup, IsSkipFeature } from '../../types'
import { resolve } from 'path'
import { fileExists } from '../../utils/path_helper'
import { rederTemplate } from '../../core/template'

export const isSkip: IsSkipFeature = async context => {
  return await fileExists(resolve(context.rootPath, '.editorconfig'))
}

export const setup: FeatureSetup = async context => {
  const { rootPath } = context
  await rederTemplate(
    resolve(rootPath, '.editorconfig'),
    resolve(__dirname, './templates/.editorconfig.tpl')
  )
}
