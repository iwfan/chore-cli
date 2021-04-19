import inquirer from 'inquirer'
import type { QuestionAnswer } from '../types'

import { buildTools } from './build-tools'
import { reactNeeded } from './react-needed'

const questionsBuilder = () => {
  return [buildTools, reactNeeded].map(builder => builder())
}

export const askQuestions = async (): Promise<QuestionAnswer> => {
  const answer = await inquirer.prompt(questionsBuilder())
  return answer
}
