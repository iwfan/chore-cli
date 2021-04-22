import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node'
}

export default config
