import inquirer from 'inquirer';

interface Answer {
  bundler: string;
  react: boolean;
  packageManager: string;
}

interface InitAnswer {
  useDefault: boolean;
  skipInstall: boolean;
}

const NO_BUNDLER_OPTION = 'None(Just use the TypeScript compiler)';

export default async function questions(init: InitAnswer) {
  const answer = await inquirer.prompt<Answer>([
    {
      type: 'list',
      name: 'bundler',
      message: 'Please choose which module bundler to use',
      choices: [
        'webpack',
        'Rollup',
        'Parcel',
        new inquirer.Separator(),
        NO_BUNDLER_OPTION,
      ],
      when: !init.useDefault,
    },
    {
      type: 'confirm',
      name: 'react',
      message: 'Do you want to use react library?',
      default: false,
      when: answer => !init.useDefault && answer.bundler !== NO_BUNDLER_OPTION,
    },
    {
      type: 'confirm',
      name: 'packageManager',
      message: 'Use Yarn to install npm packages? (otherwise use npm)',
      default: true,
      when: answer => !init.skipInstall,
    },
  ]);

  let { bundler = 'rollup', react = false, packageManager = true } = answer;

  if (bundler === NO_BUNDLER_OPTION) {
    bundler = 'tsc';
  }

  return {
    bundler,
    react,
    packageManager: packageManager ? 'yarn' : 'npm',
  };
}
