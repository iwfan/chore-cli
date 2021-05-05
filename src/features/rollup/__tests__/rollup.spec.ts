import path from 'path'
import fs from 'fs-extra'
import { isSkip, setup } from '../index'
import { DependencyType, getDepsCollection, clearDeps } from '../../../core/dependency'
import { BUILD_TOOLS } from '../../typescript/build-tools'

const rootPath = path.resolve(__dirname, 'tmp')
describe('As chore eslint feature', () => {
  beforeEach(async () => {
    clearDeps()
    await fs.ensureDir(rootPath)
  })

  afterEach(async () => {
    await fs.remove(rootPath)
  })

  it('should skip install this feature when project has exists rollup config file', async () => {
    const rollupConfigPath = path.resolve(rootPath, 'rollup.config.ts')
    await fs.ensureFile(rollupConfigPath)
    const context = { rootPath, answers: {} }
    const skiped = await isSkip(context)
    expect(skiped).toBe(true)
  })

  it('should skip this feature when given special build tool', async () => {
    const skiped = await isSkip({ rootPath, answers: { buildTool: BUILD_TOOLS.TSC } })
    expect(skiped).toBe(true)

    const skiped1 = await isSkip({ rootPath, answers: { buildTool: BUILD_TOOLS.ESBUILD } })
    expect(skiped1).toBe(true)

    const skiped2 = await isSkip({ rootPath, answers: { buildTool: BUILD_TOOLS.ROLLUP } })
    expect(skiped2).toBe(false)

    const skiped3 = await isSkip({ rootPath, answers: { buildTool: BUILD_TOOLS.WEBPACK } })
    expect(skiped3).toBe(true)
  })

  it('should write rollup config to project root when setup has been called', async () => {
    const context = { rootPath, answers: {} }
    await setup(context)

    const deps = getDepsCollection()
    const expectedDependencies = [
      'rollup',
      '@rollup/plugin-babel',
      '@rollup/plugin-node-resolve',
      '@rollup/plugin-commonjs'
    ].map(item => ({ name: item, type: DependencyType.DEV }))

    expect(deps).toStrictEqual(expectedDependencies)
  })
})
