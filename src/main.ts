import { resolve } from 'path'
import ora from 'ora'
import chalk from 'chalk'
import { ensureDir, lstat, pathExists } from 'fs-extra'
import { withSpinner } from './utils/with_spinner'
// import questions from './questions'
// import { setupEditorconfig } from './features/editorconfig'
// import { ChoreContext } from './typing'

export const isDirectoryExists = async (dir: string) =>
  (await pathExists(dir)) && (await lstat(dir)).isDirectory()

const ensureUsabilityOfPath = (path: string) => {
  const check = async () => {
    if (await isDirectoryExists(path)) {
      throw new Error(`Directory ${path} has been exists.`)
    }
    await ensureDir(path)
  }

  return withSpinner(check, {
    start: `🚨  Checking usability ${chalk.cyan('<project-path>')}`,
    success: `Created directory ${path}`,
    failed: ``
  })
}

export async function main(projectPath: string) {
  const resolvedPath = resolve(projectPath)
  await ensurePathExists(resolvedPath)
  // const answer = await questions({ useDefault: yes, skipInstall })

  // const choreContext: ChoreContext = {
  //   cwd: resolvedPath,
  //   pkgMgr: answer.packageManager,
  //   tasks: []
  // }

  // choreContext.tasks.push(answer.bundler)

  //
  // const options = {
  //   dir: libraryPath,
  //   ...answer,
  // };

  // choreBoy.pipe(setupEditorconfig).do()

  //
  // process.chdir(libraryPath);

  // chore
  //   .pipe(setupBabel, )
  //
}
