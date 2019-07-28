import inquirer from 'inquirer';
import { Feature } from './constants';

interface Answer {
  bundler: string;
  react: boolean;
  style: boolean;
}

export default async function askQuestions(useDefaultValue: boolean) {
  const NO_BUNDLER_OPTION = 'None(Just use the TypeScript compiler)';
  const answer = await inquirer.prompt<Answer>([
    {
      type: 'list',
      name: 'bundler',
      message: 'Please choose which module bundler to use',
      choices: [
        'webpack',
        'Rollup',
        new inquirer.Separator(),
        NO_BUNDLER_OPTION,
      ],
      when: !useDefaultValue,
    },
    {
      type: 'confirm',
      name: 'react',
      message: 'Do you want to use react library?',
      default: false,
      when: answer => !useDefaultValue && answer.bundler !== NO_BUNDLER_OPTION,
    },
    {
      type: 'confirm',
      name: 'style',
      message: 'Do you need to use css?',
      default: false,
      when: answer =>
        !useDefaultValue &&
        answer.bundler !== NO_BUNDLER_OPTION &&
        !answer.react,
    },
  ]);

  const features: string[] = [];
  if (answer.bundler && answer.bundler !== NO_BUNDLER_OPTION) {
    features.push(answer.bundler.toLowerCase());
  }
  if (answer.react) {
    features.push(Feature.REACT, Feature.STYLE);
  }
  if (answer.style) {
    features.push(Feature.STYLE);
  }
  return features;
}
