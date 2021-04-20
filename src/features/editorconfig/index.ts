import type { FeatureSetup, IsSkipFeature } from '../../types'
import ejs from 'ejs'
import fs from 'fs-extra'
import { resolve } from 'path'
import { fileExists } from '../../utils/path_helper'

export const isSkip: IsSkipFeature = async context => {
  return await fileExists(resolve(context.rootPath, '.editorconfig'))
}

export const setup: FeatureSetup = async context => {
  const { rootPath } = context

  const content = await ejs.renderFile(resolve(__dirname, './templates/.editorconfig.tpl'))
  const filePath = resolve(rootPath, '.editorconfig')
  await fs.ensureFile(filePath)
  await fs.writeFile(filePath, content)
}
