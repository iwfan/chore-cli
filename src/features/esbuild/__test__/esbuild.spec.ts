import path from 'path'
import fs from 'fs-extra'
import { isSkip, setup } from '../index'
import { DependencyType, getDepsCollection, clearDeps } from '../../../core/dependency'
import { BUILD_TOOLS } from '../../typescript/build-tools'

const rootPath = path.resolve(__dirname, 'tmp')
describe('As chore esbuild feature', () => {
  beforeEach(async () => {
    clearDeps()
    await fs.ensureDir(rootPath)
  })

  afterEach(async () => {
    await fs.remove(rootPath)
  })

  it('should install this feature when project has selected esbuild', async () => {
    const context = { rootPath, answers: { buildTool: BUILD_TOOLS.ESBUILD } }
    const skiped = await isSkip(context)
    expect(skiped).toBe(false)
  })

  it('should skip install this feature when project has exists eslint config file', async () => {
    const context = { rootPath, answers: {} }
    const skiped = await isSkip(context)
    expect(skiped).toBe(true)
  })

  it('should write build script to project root when setup has been called', async () => {
    const context = { rootPath, answers: { buildTool: BUILD_TOOLS.ESBUILD } }
    await setup(context)

    const buildScript = await fs.readFile(path.resolve(rootPath, 'scripts', 'build.ts'))
    expect(buildScript).toBeDefined()

    const deps = getDepsCollection()
    const expectedDependencies = ['esbuild', 'glob', '@types/glob', 'ts-node'].map(item => ({
      name: item,
      type: DependencyType.DEV
    }))

    expect(deps).toStrictEqual(expectedDependencies)
  })
})
