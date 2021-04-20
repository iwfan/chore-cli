import type { FeatureSetup, IsSkipFeature, QuestionBuilder } from '../../types'
import ejs from 'ejs'
import fs from 'fs-extra'
import { resolve } from 'path'
import { fileExists } from '../../utils/path_helper'

export const questionBuilder: QuestionBuilder = async context => {
  const skip = await isSkip(context)
  if (skip) {
    return []
  }

  return [
    {
      type: 'confirm',
      name: 'isBrowserListNeeded',
      message: '❓ Do you need to use BrowserList?',
      default: false
    }
  ]
}

export const isSkip: IsSkipFeature = async context => {
  return await fileExists(resolve(context.rootPath, '.browserslistrc'))
}

export const setup: FeatureSetup = async context => {
  const {
    rootPath,
    answers: { isBrowserListNeeded }
  } = context

  if (isBrowserListNeeded) {
    const content = await ejs.renderFile(resolve(__dirname, 'templates', '.browserslistrc.tpl'))
    const filePath = resolve(rootPath, '.browserslistrc')
    await fs.ensureFile(filePath)
    await fs.writeFile(filePath, content)
  }
}
