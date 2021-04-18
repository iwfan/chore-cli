import inquirer from 'inquirer';
import { Bundler, PackageManager } from './typing';

interface Answer {
  bundler: string;
  react: boolean;
  packageManager: boolean;
}

interface InitAnswer {
  useDefault: boolean;
  skipInstall: boolean;
}

export default async function questions(init: InitAnswer) {
  const answer = await inquirer.prompt<Answer>([
    {
      type: 'list',
      name: 'bundler',
      message: 'Please choose which module bundler to use',
      choices: [
        Bundler.webpack,
        Bundler.rollup,
        Bundler.parcel,
        new inquirer.Separator(),
        Bundler.TSC,
      ],
      when: !init.useDefault,
    },
    {
      type: 'confirm',
      name: 'react',
      message: 'Do you want to use react library?',
      default: false,
      when: answer => !init.useDefault && answer.bundler !== Bundler.TSC,
    },
    {
      type: 'confirm',
      name: 'packageManager',
      message: 'Use Yarn to install npm packages? (otherwise use npm)',
      default: true,
      when: answer => !init.skipInstall,
    },
  ]);

  let {
    bundler = Bundler.rollup,
    react = false,
    packageManager = true,
  } = answer;

  return {
    bundler: bundler as Bundler,
    react,
    packageManager: (packageManager ? 'yarn' : 'npm') as PackageManager,
  };
}
