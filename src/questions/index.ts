import inquirer from 'inquirer'
import type { QuestionAnswers } from '../types'

import { buildTools } from './build-tools'
import { reactNeeded } from './react-needed'

const questionsBuilder = () => {
  return [buildTools, reactNeeded].map(builder => builder())
}

export const askQuestions = async (): Promise<QuestionAnswers> => {
  const answer = await inquirer.prompt(questionsBuilder())
  return answer
}
