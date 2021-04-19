import { lstat, pathExists } from 'fs-extra'
import { withSpinner } from '../utils/with_spinner'
import { colorizePath } from '../utils/colorizer'

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
