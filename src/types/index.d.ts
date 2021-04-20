import type { Question, QuestionCollection, Answers } from 'inquirer'
import { BUILD_TOOLS } from './questions/build-tools'

interface FeatFile {
  readonly path: string
  readonly data: (() => string) | string
}

type DepType = 'default' | 'dev' | 'peer'

interface FeatDep {
  readonly name: string
  readonly type: DepType
}

interface FeatureData {
  readonly fileCollection?: FeatFile[]
  readonly depCollection?: FeatDep[]
}

export interface QuestionAnswers extends Answers {
  readonly buildTool?: BUILD_TOOLS
  readonly isReactNeeded?: boolean
}

export interface FeatureContext {
  readonly rootPath: string
  readonly answers: QuestionAnswers
}

export interface QuestionBuilder {
  (context: FeatureContext): Promise<QuestionCollection>
}

export interface FeatureSetup {
  (context: FeatureContext): Promise<FeatureData>
}

export interface FeatureModule extends Record<string, unknown> {
  readonly questionsBuilder: QuestionBuilder
  readonly setup: FeatureSetup
  readonly teardown?: (context: FeatureContext) => Promise<void>
}
