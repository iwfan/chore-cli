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

  it('should skip install this feature when project has exists babel config file', async () => {
    const eslintPath = path.resolve(rootPath, '.babelrc')
    await fs.ensureFile(eslintPath)
    const context = { rootPath, answers: {} }
    const skipped = await isSkip(context)
    expect(skipped).toBe(true)
  })

  it('should skip this feature when given special build tool', async () => {
    expect(await isSkip({ rootPath, answers: { buildTool: BUILD_TOOLS.TSC } })).toBe(true)

    expect(await isSkip({ rootPath, answers: { buildTool: BUILD_TOOLS.ESBUILD } })).toBe(true)

    expect(await isSkip({ rootPath, answers: { buildTool: BUILD_TOOLS.SNOWPACK } })).toBe(true)

    expect(await isSkip({ rootPath, answers: { buildTool: BUILD_TOOLS.ROLLUP } })).toBe(false)

    expect(await isSkip({ rootPath, answers: { buildTool: BUILD_TOOLS.WEBPACK } })).toBe(false)
  })

  it('should write babel config to project root when setup has been called with no react', async () => {
    const babelrcPath = path.resolve(rootPath, '.babelrc')
    const context = { rootPath, answers: {} }
    await setup(context)

    const configContent = await fs.readJSON(babelrcPath)
    expect(configContent).toStrictEqual({
      presets: ['@babel/preset-env', '@babel/preset-typescript'],
      plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread'
      ]
    })

    const deps = getDepsCollection()
    const expectedDependencies = [
      '@babel/cli',
      '@babel/core',
      '@babel/preset-env',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/preset-typescript',
      '@babel/plugin-transform-runtime'
    ].map(item => ({ name: item, type: DependencyType.DEV }))

    expectedDependencies.push({ name: '@babel/runtime', type: DependencyType.DEFAULT })

    expect(deps).toStrictEqual(expectedDependencies)
  })

  it('should write babel config to project root when setup has been called with react needed', async () => {
    const eslintPath = path.resolve(rootPath, '.babelrc')
    const context = { rootPath, answers: { isReactNeeded: true } }
    await setup(context)

    const configContent = await fs.readJSON(eslintPath)
    expect(configContent).toStrictEqual({
      presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
      plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread'
      ]
    })

    const deps = getDepsCollection()
    const expectedDependencies = [
      '@babel/cli',
      '@babel/core',
      '@babel/preset-env',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/preset-typescript',
      '@babel/plugin-transform-runtime'
    ].map(item => ({ name: item, type: DependencyType.DEV }))

    expectedDependencies.push({ name: '@babel/runtime', type: DependencyType.DEFAULT })
    expectedDependencies.push({ name: '@babel/preset-react', type: DependencyType.DEV })
    expect(deps).toStrictEqual(expectedDependencies)
  })
})
