#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const program = require('commander');
const inquirer = require('inquirer');
const execa = require('execa');
const TaskList = require('listr');
const { projectInstall } = require('pkg-install');
const { description, version } = require('../package.json');


program
  .description(description)
  .version(version)
  .usage('[options] <project-directory>')
  // .option('-g, --git', 'This will run git init to instantiate a new git project')
  // .option('-i, --install', 'This will automatically install all the dependencies for the project')
  // .option('-y, --yes', 'This will skip all prompts and go for default options')
  .action(async (projectDirectory, cmd) => {

    if (typeof projectDirectory !== 'string') {
      console.error('%s Please specify the project directory first!', chalk.red.bold('ERROR'));
      return;
    }

    const projectDirPath = path.resolve(process.cwd(), projectDirectory);

    if (fs.existsSync(projectDirPath)) {
      console.error('%s Project directory already exists!', chalk.red.bold('ERROR'));
      return;
    }

    const baseOptions = {
      projectDir: projectDirPath,
      // initGitRepository: cmd.git,
      // installDepend: cmd.install,
      // skipPrompts: cmd.yes,
    };


    const options = await promptForMissingOptions(baseOptions);

    console.log(options);

    const dependencies = [];
    const devDependencies = [];

    await createProject(options);

  });


program.parse(process.argv);


async function promptForMissingOptions(options) {
  const questions = [];

  if (!options.initGitRepository) {
    questions.push({
      type: 'confirm',
      name: 'initGitRepository',
      message: 'Initialize a git repository?',
      default: true,
    });
  }

  questions.push({
    type: 'list',
    name: 'language',
    message: 'Please choose which language to use',
    choices: ['TypeScript', 'JavaScript'],
    default: 'TypeScript',
  });

  questions.push({
    type: 'list',
    name: 'bundler',
    message: 'Please choose which module bundler to use',
    choices: ['webpack', 'rollup'],
    default: 'webpack',
  });


  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    initGitRepository: options.initGitRepository || answers.initGitRepository,
    libraries: {
      language: answers.language,
      bundler: answers.bundler,
    }
  };
}

async function createProject(options) {

  const tasks = new TaskList([
    {
      title: 'Initialize git repository',
      task: () => initGitRepository(options),
      enabled: () => options.initGitRepository,
    },
    {
      title: 'Add dependencies',
      task: () => { console.log(1) }
    },
    {
      title: 'Install dependencies',
      task: () =>
        projectInstall({
          cwd: options.projectDir,
        }),
      skip: () =>
        !options.runInstall
          ? 'Pass --install to automatically install dependencies'
          : undefined,
    },
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
