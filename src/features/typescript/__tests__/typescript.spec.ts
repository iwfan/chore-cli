import path from 'path'
import fs from 'fs-extra'
import { isSkip, setup } from '../index'
import { DependencyType, getDepsCollection, clearDeps } from '../../../core/dependency'

const rootPath = path.resolve(__dirname, 'tmp')
describe('As chore typescript feature', () => {
  beforeEach(async () => {
    clearDeps()
    await fs.ensureDir(rootPath)
  })

  afterEach(async () => {
    await fs.remove(rootPath)
  })

  it('should install this feature when project has no typescript config file', async () => {
    const context = { rootPath, answers: {} }
    const skiped = await isSkip(context)
    expect(skiped).toBe(false)
  })

  it('should skip install this feature when project has exists typescript config file', async () => {
    const tsconfPath = path.resolve(rootPath, 'tsconfig.json')
    await fs.ensureFile(tsconfPath)
    const context = { rootPath, answers: {} }
    const skiped = await isSkip(context)
    expect(skiped).toBe(true)
  })

  it('should write typescript config to project root when setup has been called', async () => {
    const tsconfPath = path.resolve(rootPath, 'tsconfig.json')
    const context = { rootPath, answers: {} }
    await setup(context)
    const configContent = await fs.readFile(tsconfPath)
    expect(configContent).toBeDefined()

    const deps = getDepsCollection()
    const expectedDependencies = ['typescript', 'typedoc'].map(item => ({
      name: item,
      type: DependencyType.DEV
    }))

    expectedDependencies.unshift({ name: 'tslib', type: DependencyType.DEFAULT })

    expect(deps).toStrictEqual(expectedDependencies)
  })
})
