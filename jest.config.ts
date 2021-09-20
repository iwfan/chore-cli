import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/', '__tests__', 'dist'],
  collectCoverageFrom: ['src/**/*.{js,ts}']
}

export default config
