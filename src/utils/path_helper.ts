import { lstat, pathExists } from 'fs-extra'
import { withSpinner } from './with_spinner'
import { colorizePath } from './colorizer'

export const ensureUsabilityOfPath = async (path: string) => {
  const check = async () => {
    if (!(await pathExists(path))) {
      return
    }

    if (!(await lstat(path)).isDirectory()) {
      throw new Error(`path ${colorizePath(path)} already exists.`)
    }
  }

  try {
    await withSpinner(check, {
      start: `👷 Checking usability ${colorizePath('<project-path>')}`,
      success: `🏗  The development infrastructure will be generated in ${colorizePath(path)}`,
      failed: `🚨 path ${colorizePath(path)} already exists and it is not a directory.`
    })
  } catch {}
}

export const fileExists = async (path: string) => {
  return (await pathExists(path)) && (await lstat(path)).isFile()
}
