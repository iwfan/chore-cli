import execa from 'execa';
import Listr from 'listr';
import fs from 'fs-extra';
import getPackageManager from './helper/getPackageManager';

export default async function createProject(options) {

  const tasks = new Listr([
    {
      title: 'Create project directory',
      task: async ({ options }) => {
        await fs.mkdirp(options.projectDir);
        process.chdir(options.projectDir);
      }
    },
    {
      title: 'Initialize git repository',
      task: async ({ options }, task) => {
        try {
          await execa('git1', ['init']);
        } catch (e) {
          task.skip('Failed to initialize git repository');
        }
      },
      skip: () => !options.initGitRepository,
    },
    {
      title: 'Initialize project',
      task: async (ctx) => {
        const cmd = getPackageManager();
        await execa(cmd, ['init', '-y']);
        ctx.pkgCmd = cmd;
      }
    },
    {
      title: 'Add dependencies',
      task: async (ctx) => {
        await execa(ctx.pkgCmd, ['add', 'typescript']);
      }
    },
    // {
    //   title: 'Install dependencies',
    //   task: () =>
    //     projectInstall({
    //       cwd: options.projectDir,
    //     }),
    //   skip: () =>
    //     !options.runInstall
    //       ? 'Pass --install to automatically install dependencies'
    //       : undefined,
    // },
  ]);

  try {
    await tasks.run({ options });
  } catch (e) {
    try {
      await fs.remove(options.projectDir);
    } catch (e) {

    }
  }
};
