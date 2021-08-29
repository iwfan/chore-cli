import path from 'path'
import fs from 'fs-extra'
import { questionBuilder, isSkip } from '../index'

const rootPath = path.resolve(__dirname, 'tmp')
describe('As chore package info feature', () => {
  beforeEach(async () => {
    await fs.ensureDir(rootPath)
  })

  afterEach(async () => {
    await fs.remove(rootPath)
  })

  it('should return question list when questionBuilder has been called', async () => {
    const context = { rootPath, answers: {} }
    const questionList = await questionBuilder(context)
    expect(questionList).toBeDefined()
    expect((questionList as Array<unknown>).length).toBe(4)
  })

  it('should return empty question list when package json file has exists', async () => {
    const packageJsonPath = path.resolve(rootPath, 'package.json')
    await fs.ensureFile(packageJsonPath)
    const context = { rootPath, answers: {} }
    const questionList = await questionBuilder(context)
    expect(questionList).toBeUndefined()
  })

  it('should skip install this feature when project has exists package json file', async () => {
    const packageJsonPath = path.resolve(rootPath, 'package.json')
    await fs.ensureFile(packageJsonPath)
    const context = { rootPath, answers: {} }
    const skipped = await isSkip(context)
    expect(skipped).toBe(true)
  })
})
