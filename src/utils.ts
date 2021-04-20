import { execSync } from 'child_process'

import fs, { ensureDirSync, existsSync, lstatSync } from 'fs-extra'
import path from 'path'

export function isValidDirectory(directory: string) {
  return existsSync(directory)
    ? lstatSync(directory).isDirectory()
    : (ensureDirSync(directory), true)
}

export function getPackageManager(): PackageManager {
  try {
    execSync('yarnpkg --version')
    return 'yarn'
  } catch (e) {
    return 'npm'
  }
}

export async function writeFileFromObject(files: FileContent, parentDir = '') {
  for (const filename in files) {
    if (Object.hasOwnProperty.call(files, filename)) {
      const fileContent = files[filename]
      if (typeof fileContent === 'string') {
        let filePath = path.resolve(parentDir, filename)
        if (fs.existsSync(filePath)) {
          filePath = path.resolve(parentDir, 'chore_' + filename)
        }
        await fs.ensureFile(filePath)
        await fs.writeFile(filePath, fileContent)
      } else if (typeof fileContent === 'object') {
        await writeFileFromObject(fileContent, path.resolve(parentDir, filename))
      }
    }
  }
}
