const execa = require('execa');
const Listr = require('listr');
const fs = require('fs');
const { promisify } = require('util');
const { projectInstall } = require('pkg-install');

const mkdir = promisify(fs.mkdir);

module.exports = async function createProject(options) {

  const tasks = new Listr([
    {
      title: '创建项目目录',
      task: async () => {
        await mkdir(options.projectDir);
        process.chdir(options.projectDir);
      }
    },
    {
      title: 'Initialize git repository',
      task: async (ctx, task) => {
        try {
          await execa('git', ['init']);
        } catch (e) {
          task.skip('Failed to initialize git repository');
        }
      },
      enabled: () => options.initGitRepository,
    },
    {
      title: 'Initialize project',
      task: async () => {
        await execa('npm', ['init', '-y'])
      }
    },
    {
      title: 'Add dependencies',
      task: async () => {
        await execa('yarn', ['add', 'typescript'])
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
    await tasks.run(options);
  } catch (e) {
    console.log(e);

    fs.rmdir(options.projectDir);
  }

};
