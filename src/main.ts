import { resolve } from 'path';
import ora from 'ora';
import chalk from 'chalk';
import { ensureDir, lstat, pathExists } from 'fs-extra';
import questions from './questions';
import chore from './chore';
import { setupEditorconfig } from './features/editorconfig';
import { ChoreContext } from './typing';

export const isExistsDir = async (dir: string) =>
  (await pathExists(dir)) && (await lstat(dir)).isDirectory();

const ensurePathExists = async (path: string) => {
  const spinner = ora(`checking ${chalk.cyan('<library-path>')}`);
  spinner.start();
  if (await isExistsDir(path)) {
    spinner.fail(`Directory ${path} has been exists.`);
    throw new Error(`Directory ${path} has been exists.`);
  }
  await ensureDir(path);
  spinner.succeed(`Created directory ${path}`);
};

export async function main(
  libraryPath: string,
  { yes = false, skipInstall = false },
) {
  console.log(skipInstall);
  const projectPath = resolve(libraryPath);
  await ensurePathExists(projectPath);
  const answer = await questions({ useDefault: yes, skipInstall });

  const choreContext: ChoreContext = {
    cwd: libraryPath,
    pkgMgr: answer.packageManager,
    tasks: [],
  };

  choreContext.tasks.push(answer.bundler);

  //
  // const options = {
  //   dir: libraryPath,
  //   ...answer,
  // };

  choreBoy.pipe(setupEditorconfig).do();

  //
  // process.chdir(libraryPath);

  // chore
  //   .pipe(setupBabel, )
  //
}