import { resolve } from 'path'
import { ensureUsabilityOfPath } from './services/path_service'
// import { askQuestions } from './questions'
import * as npmPackageFeature from './features/npm_package_info'
import type { FeatureContext } from './types'
import inquirer from 'inquirer'

export async function main(projectPath: string) {
  const resolvedPath = resolve(projectPath)
  await ensureUsabilityOfPath(resolvedPath)

  const context: FeatureContext = { rootPath: '', answers: {} }

  if (npmPackageFeature.questionBuilder) {
    const questions = await npmPackageFeature.questionBuilder(context)
    const answer = await inquirer.prompt(questions)
    console.log(answer)
  }

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
