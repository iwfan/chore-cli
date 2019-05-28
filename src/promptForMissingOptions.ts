import inquirer from 'inquirer';

type Answer = {
  language: string;
  bundler: string;
}

export default async function promptForMissingOptions(options: ChoreOptions): Promise<ChoreOptions> {

  let answer: Partial<Answer> = {};

  const features = [
    'babel',
    'eslint',
    'prettier',
    // 'stylelint',
    'commitlint',
    'conventional-changelog',
    'jest',
  ];


  if (!options.skipPrompts) {
    answer = await inquirer.prompt<Answer>([
      {
        type: 'list',
        name: 'language',
        message: 'please choose which language to use',
        choices: ['TypeScript', 'JavaScript'],
      },
      {
        type: 'list',
        name: 'bundler',
        message: 'Please choose which module bundler to use',
        choices: ['webpack', 'Rollup'],
      }
    ]);
  }

  const { language, bundler } = answer;

  features.push(language ? language.toLowerCase() : 'typescript');
  features.push(bundler ? bundler.toLowerCase() : 'webpack');

  return {
    ...options,
    features,
  };
};



