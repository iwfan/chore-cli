#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import cmd from 'commander';
import chalk from 'chalk';
import promptForMissingOptions from './promptForMissingOptions';
import createProject from './createProject';

const { description, version } = fs.readJsonSync(
  path.resolve(__dirname, '../package.json'),
);

cmd
  .description(description)
  .version(version)
  .usage('[options] <project-directory>')
  .option('-y, --yes', 'This will skip all prompts and go for default options')
  .action(async (projectDirectory, cmd) => {
    try {
      if (typeof projectDirectory !== 'string') {
        console.error(
          '%s Please specify the project directory first!',
          chalk.red.bold('ERROR'),
        );
        return;
      }

      const projectDirPath = path.resolve(process.cwd(), projectDirectory);

      if (
        fs.existsSync(projectDirPath) &&
        !fs.lstatSync(projectDirPath).isDirectory()
      ) {
        console.error(
          '%s The project directory provided is not a correct directory!',
          chalk.red.bold('ERROR'),
        );
        return;
      }

      const baseOptions: ChoreOptions = {
        projectDir: projectDirPath,
        skipPrompts: cmd.yes,
        features: [],
        deps: [],
        devDeps: [],
        files: {},
        postInstallListener: [],
      };

      const options = await promptForMissingOptions(baseOptions);

      await createProject(options);
    } catch (e) {
      console.error(e);
    }
  });

cmd.parse(process.argv);
