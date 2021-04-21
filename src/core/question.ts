import type { Answers } from 'inquirer'

export const buildInputQuestion = (
  name: string,
  message: string,
  defaultValue?: string,
  when?: (ansers: Answers) => boolean
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
  when?: (ansers: Answers) => boolean
) {
  return {
    type: 'confirm',
    name,
    message,
    ...(defaultValue != null ? { default: defaultValue } : null),
    ...(when != null ? { when } : null)
  }
}
