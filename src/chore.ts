#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import cmd from 'commander';
import chalk from 'chalk';
import promptForMissingOptions from './promptForMissingOptions';
// import createProject from './createProject';


const { description, version } = fs.readJsonSync(path.resolve(__dirname, '../package.json'));

cmd
  .description(description)
  .version(version)
  .usage('[options] <project-directory>')
  .option('-y, --yes', 'This will skip all prompts and go for default options')
  .action(async (projectDirectory, cmd) => {

    if (typeof projectDirectory !== 'string') {
      console.error('%s Please specify the project directory first!', chalk.red.bold('ERROR'));
      return;
    }

    const projectDirPath = path.resolve(process.cwd(), projectDirectory);

    if (fs.pathExistsSync(projectDirPath)) {
      console.error('%s Project directory already exists!', chalk.red.bold('ERROR'));
      return;
    }

    const baseOptions: ChoreOptions = {
      projectDir: projectDirPath,
      skipPrompts: cmd.yes,
    };

    const features = ['typescript', 'webpack', 'eslint', 'prettier', 'commitmessagelint'];
    const options = await promptForMissingOptions(baseOptions);

    // await createProject(options);
    console.log(features, options);
  });


cmd.parse(process.argv);
