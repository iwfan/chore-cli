#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import cmd from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import promptForMissingOptions from './promptForMissingOptions';
import createProject from './createProject';

(async () => {

  const { description, version } = await fs.readJson(path.resolve(__dirname, '../package.json'));

  cmd
    .description(description)
    .version(version)
    .usage('[options] <project-directory>')
    .option('-y, --yes', 'This will skip all prompts and go for default options')
    .action(async (projectDirectory, cmd) => {

      if (typeof projectDirectory !== 'string') {
        console.error('%s Please specify the project directory first!', chalk.red.bold('ERROR'));
        ora('dwadawcho').fail('abcas')
        return;
      }

      const projectDirPath = path.resolve(process.cwd(), projectDirectory);

      if (fs.pathExistsSync(projectDirPath)) {
        console.error('%s Project directory already exists!', chalk.red.bold('ERROR'));
        return;
      }

      const baseOptions = {
        projectDir: projectDirPath,
        skipPrompts: cmd.yes,
      };


      const options = await promptForMissingOptions(baseOptions);

      await createProject(options);

    });


  cmd.parse(process.argv);

})().catch(() => {

});
