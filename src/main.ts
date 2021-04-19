import { resolve } from 'path'
import ora from 'ora'
import chalk from 'chalk'
import { ensureDir, lstat, pathExists } from 'fs-extra'
import { withSpinner } from './utils/with_spinner'
import { colorizePath } from './utils/colorizer'
// import questions from './questions'
// import { setupEditorconfig } from './features/editorconfig'
// import { ChoreContext } from './typing'

const ensureUsabilityOfPath = async (path: string) => {
  const check = async () => {
    if (!(await pathExists(path))) {
      await ensureDir(path)
      return
    }

    if (!(await lstat(path)).isDirectory()) {
      throw new Error(`path ${colorizePath(path)} already exists.`)
    }
  }

  await withSpinner(check, {
    start: `🚨  Checking usability ${colorizePath('<project-path>')}`,
    success: `Created directory ${colorizePath(path)}`,
    failed: `path ${colorizePath(path)} already exists.`
  })
}

export async function main(projectPath: string) {
  const resolvedPath = resolve(projectPath)
  await ensureUsabilityOfPath(resolvedPath)
  ora().info(`The development infrastructure will be deployed in the ${colorizePath(resolvedPath)}`)
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
