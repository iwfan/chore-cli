export const buildInputQuestion = (name: string, message: string, defaultValue?: string) => {
  return {
    type: 'input',
    name,
    message,
    ...(defaultValue ? { default: defaultValue } : null)
  }
}
