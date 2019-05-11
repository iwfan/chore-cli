const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const program = require('commander');
const { description, version } = require('../package.json');
const promptForMissingOptions = require('./promptForMissingOptions');
const createProject = require('./createProject');

program
  .description(description)
  .version(version)
  .usage('[options] <project-directory>')
  .option('-g, --git', 'This will run git init to instantiate a new git project')
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
      initGitRepository: cmd.git,
      // installDepend: cmd.install,
      // skipPrompts: cmd.yes,
    };


    // const options = await promptForMissingOptions(baseOptions);

    // console.log(options);

    await createProject(baseOptions);

  });


program.parse(process.argv);
