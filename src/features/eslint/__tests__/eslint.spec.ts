import path from 'path'
import fs from 'fs-extra'
import { isSkip, setup } from '../index'
import { DependencyType, getDepsCollection, clearDeps } from '../../../core/dependency'

const rootPath = path.resolve(__dirname, 'tmp')
describe('As chore eslint feature', () => {
  beforeEach(async () => {
    clearDeps()
    await fs.ensureDir(rootPath)
  })

  afterEach(async () => {
    await fs.remove(rootPath)
  })

  it('should install this feature when project has no eslint config file', async () => {
    const context = { rootPath, answers: {} }
    const skiped = await isSkip(context)
    expect(skiped).toBe(false)
  })

  it('should skip install this feature when project has exists eslint config file', async () => {
    const eslintPath = path.resolve(rootPath, '.eslintrc')
    await fs.ensureFile(eslintPath)
    const context = { rootPath, answers: {} }
    const skiped = await isSkip(context)
    expect(skiped).toBe(true)
  })

  it('should write eslint config to project root when setup has been called with no react', async () => {
    const eslintPath = path.resolve(rootPath, '.eslintrc')
    const context = { rootPath, answers: {} }
    await setup(context)

    const configContent = await fs.readJSON(eslintPath)
    expect(configContent.parser).toBe('@typescript-eslint/parser')
    expect(configContent.parserOptions.ecmaFeatures).toBeUndefined()
    expect(configContent.extends).toStrictEqual([
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:jest/recommended',
      'plugin:prettier/recommended'
    ])

    const deps = getDepsCollection()
    const expectedDependencies = [
      'eslint',
      '@typescript-eslint/parser',
      '@typescript-eslint/eslint-plugin',
      'eslint-plugin-prettier',
      'eslint-config-prettier',
      'eslint-plugin-jest'
    ].map(item => ({ name: item, type: DependencyType.DEV }))

    expect(deps).toStrictEqual(expectedDependencies)
  })

  it('should write eslint config to project root when setup has been called with react needed', async () => {
    const eslintPath = path.resolve(rootPath, '.eslintrc')
    const context = { rootPath, answers: { isReactNeeded: true } }
    await setup(context)

    const configContent = await fs.readJSON(eslintPath)
    expect(configContent.parser).toBe('@typescript-eslint/parser')
    expect(configContent.parserOptions.ecmaFeatures).toBeDefined()
    expect(configContent.extends).toStrictEqual([
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:jest/recommended',
      'plugin:prettier/recommended'
    ])

    const deps = getDepsCollection()
    const expectedDependencies = [
      'eslint',
      '@typescript-eslint/parser',
      '@typescript-eslint/eslint-plugin',
      'eslint-plugin-prettier',
      'eslint-config-prettier',
      'eslint-plugin-jest',
      'eslint-plugin-react',
      'eslint-plugin-react-hooks'
    ].map(item => ({ name: item, type: DependencyType.DEV }))

    expect(deps).toStrictEqual(expectedDependencies)
  })
})
