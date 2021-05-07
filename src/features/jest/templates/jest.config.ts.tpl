import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/', '__tests__', 'dist'],
  collectCoverageFrom: ['src/**/*.{js,ts}']
}

export default config
