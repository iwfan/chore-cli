import type { QuestionAnswer } from '../types'
import { BUILD_TOOLS } from './build-tools'

export const reactNeeded = () => {
  return {
    type: 'confirm',
    name: 'isReactNeeded',
    message: '❓ Do you need to use React?',
    default: false,
    when: (answer: QuestionAnswer) => answer.buildTool !== BUILD_TOOLS.TSC
  }
}
