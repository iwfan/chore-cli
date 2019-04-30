const inquirer = require('inquirer');

module.exports = async function promptForMissingOptions(options) {
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
