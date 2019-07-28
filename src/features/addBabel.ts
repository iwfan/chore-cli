import { Feature } from '../constants';

export default async function addBabel(options: ChoreOptions) {
  const { features } = options;

  const babelConfig: any = {
    presets: [['@babel/preset-env'], '@babel/preset-typescript'],
    plugins: [
      '@babel/proposal-class-properties',
      '@babel/proposal-object-rest-spread',
    ],
  };

  options.devDeps = [
    ...options.devDeps,
    '@babel/cli',
    '@babel/core',
    '@babel/preset-env',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/preset-typescript',
  ];

  if (features.includes(Feature.REACT)) {
    babelConfig.presets.push('@babel/preset-react');
    options.devDeps = [...options.devDeps, '@babel/preset-react'];
  }

  Object.assign<FileContent, FileContent>(options.files, {
    '.babelrc': JSON.stringify(babelConfig, null, 2),
  });
}
