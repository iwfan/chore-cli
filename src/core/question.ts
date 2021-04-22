import type { QuestionAnswers } from '../types'

export const buildInputQuestion = (
  name: string,
  message: string,
  defaultValue?: string,
  when?: (ansers: QuestionAnswers) => boolean
) => {
  return {
    type: 'input',
    name,
    message,
    ...(defaultValue != null ? { default: defaultValue } : null),
    ...(when != null ? { when } : null)
  }
}

export function buildConfirmQuestion(
  name: string,
  message: string,
  defaultValue?: boolean,
  when?: (ansers: QuestionAnswers) => boolean
) {
  return {
    type: 'confirm',
    name,
    message,
    ...(defaultValue != null ? { default: defaultValue } : null),
    ...(when != null ? { when } : null)
  }
}

export function buildListQuestion(
  name: string,
  message: string,
  choices: Array<{ name: string; value: string | number }>,
  defaultValue?: boolean,
  when?: (ansers: QuestionAnswers) => boolean
) {
  return {
    type: 'list',
    name,
    message,
    choices,
    ...(defaultValue != null ? { default: defaultValue } : null),
    ...(when != null ? { when } : null)
  }
}
