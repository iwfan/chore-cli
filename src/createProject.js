const execa = require('execa');
const TaskList = require('listr');
const { projectInstall } = require('pkg-install');
const { promisifyExec } = require('./util');
module.exports = async function createProject(options) {

  const tasks = new TaskList([
    {
      title: 'Initialize git repository',
      task: () => promisifyExec(`git1 init ${options.projectDir}`),
      // enabled: () => options.initGitRepository,
    },
    // {
    //   title: 'Add dependencies',
    //   task: () => { console.log(1) }
    // },
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

  await tasks.run();


}

async function initGitRepository(options) {
  const result = await execa('git', ['init'], {
    cwd: options.projectDir,
  });
  if (result.failed) {
    console.log(chalk.red.bold('Failed to initialize git repository'));
  }
  return;


}
