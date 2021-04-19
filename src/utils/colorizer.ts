import chalk from 'chalk'

export const colorizePath = (path: string) => chalk.green(path)
export const colorizeUrl = (url: string) => chalk.greenBright(url)
export const colorizeText = (text: string) => chalk.cyan.bold(text)
export const colorizeErrorText = (text: string) => chalk.red.bold(text)
