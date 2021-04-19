import { resolve } from 'path'
import { ensureUsabilityOfPath } from './services/path_service'
// import questions from './questions'
import { askQuestions } from './questions'
// import { setupEditorconfig } from './features/editorconfig'
// import { ChoreContext } from './typing'

export async function main(projectPath: string) {
  const resolvedPath = resolve(projectPath)
  await ensureUsabilityOfPath(resolvedPath)
  const answer = await askQuestions()
  console.log(answer)
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
