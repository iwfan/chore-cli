import { BUILD_TOOLS } from './questions/build-tools'

export interface QuestionAnswer {
  buildTool: BUILD_TOOLS
  isReactNeeded: boolean
}
