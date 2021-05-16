import path from 'path'
import fs from 'fs-extra'
import { isSkip, setup } from '../index'
import { DependencyType, getDepsCollection, clearDeps } from '../../../core/dependency'
import { BUILD_TOOLS } from '../../typescript/build-tools'

const rootPath = path.resolve(__dirname, 'tmp')
describe('As chore snowpack feature', () => {
  beforeEach(async () => {
    clearDeps()
    await fs.ensureDir(rootPath)
  })

  afterEach(async () => {
    await fs.remove(rootPath)
  })

  it('should install this feature when project has not exists snowpack config file', async () => {
    const context = { rootPath, answers: { buildTool: BUILD_TOOLS.SNOWPACK } }
    const skiped = await isSkip(context)
    expect(skiped).toBe(false)
  })

  it('should skip install this feature when project has exists snowpack config file', async () => {
    const snowpackConfigPath = path.resolve(rootPath, 'snowpack.config.js')
    await fs.ensureFile(snowpackConfigPath)
    const context = { rootPath, answers: {} }
    const skiped = await isSkip(context)
    expect(skiped).toBe(true)
  })

  it('should write snowpack config to project root when setup has been called', async () => {
    const context = { rootPath, answers: {} }
    await setup(context)

    const snowpackConfigPath = path.resolve(rootPath, 'snowpack.config.js')
    const configContent = await fs.readFile(snowpackConfigPath)
    expect(configContent).toBeDefined()
    const deps = getDepsCollection()
    const expectedDependencies = ['snowpack', '@snowpack/plugin-typescript'].map(item => ({
      name: item,
      type: DependencyType.DEV
    }))

    expect(deps).toStrictEqual(expectedDependencies)
  })
})
