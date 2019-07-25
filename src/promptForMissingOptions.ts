import inquirer from 'inquirer';

type Answer = {
  language: string;
  bundler: string;
  react: boolean;
};

export default async function promptForMissingOptions(
  options: ChoreOptions,
): Promise<ChoreOptions> {
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
        name: 'bundler',
        message: 'Please choose which module bundler to use',
        choices: ['webpack', 'Rollup'],
      },
      {
        type: 'confirm',
        name: 'react',
        message: 'Do you want to use react library?',
        default: false,
      },
    ]);
  }

  const { language, bundler, react } = answer;

  features.push(language ? language.toLowerCase() : 'typescript');
  features.push(bundler ? bundler.toLowerCase() : 'rollup');
  if (react) {
    features.push('react');
  }

  return {
    ...options,
    features,
  };
}
