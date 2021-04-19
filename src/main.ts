import { resolve } from 'path'
import { ensureUsabilityOfPath } from './services/path_service'
// import { askQuestions } from './questions'

export async function main(projectPath: string) {
  const resolvedPath = resolve(projectPath)
  await ensureUsabilityOfPath(resolvedPath)
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
