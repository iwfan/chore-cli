// import inquirer from 'inquirer';

export default async function promptForMissingOptions(options: ChoreOptions): Promise<ChoreOptions> {
// const questions = [];

  // if (!options.skipPrompts) {
  //   questions.push({
  //     type: 'confirm',
  //     name: 'initGitRepository',
  //     message: 'Initialize a git repository?',
  //     default: true,
  //   });
  // }

  // questions.push({
  //   type: 'list',
  //   name: 'language',
  //   message: 'Please choose which language to use',
  //   choices: ['TypeScript', 'JavaScript'],
  //   default: 'TypeScript',
  // });
  //
  // questions.push({
  //   type: 'list',
  //   name: 'bundler',
  //   message: 'Please choose which module bundler to use',
  //   choices: ['webpack', 'rollup'],
  //   default: 'webpack',
  // });


  // const answers = await inquirer.prompt<{ initGitRepository: boolean }>(questions);

  const features = [
    'typescript',
    'webpack',
    'babel',
    'eslint',
    'prettier',
    'stylelint',
    'commitlint',
    'conventional-changelog',
    'jest',
  ];

  return {
    ...options,
    initGitRepository: true,
    features,
  };
}
