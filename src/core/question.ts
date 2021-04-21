export const buildInputQuestion = (name: string, message: string, defaultValue?: string) => {
  return {
    type: 'input',
    name,
    message,
    ...(defaultValue != null ? { default: defaultValue } : null)
  }
}

export const buildConfirmQuestion = (name: string, message: string, defaultValue?: boolean) => {
  return {
    type: 'confirm',
    name,
    message,
    ...(defaultValue != null ? { default: defaultValue } : null)
  }
}
