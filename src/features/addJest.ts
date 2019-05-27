import fs from 'fs-extra';
import path from 'path';

export default async function (options: ChoreOptions) {
  const { features } = options;
  const babelConfig: any = {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
    ],
  };

  options.devDeps = [...options.devDeps, 'jest', 'babel-jest', '@babel/core', '@babel/preset-env'];
  if (features.includes('typescript')) {
    babelConfig.presets.push('@babel/preset-typescript');
    options.devDeps.push('@babel/preset-typescript', '@types/jest', '@types/node');
  }

  Object.assign<FileContent, FileContent>(options.files, {
    '.babelrc': JSON.stringify(babelConfig, null, 2)
  });

  options.postInstallListener.push(async () => {
    await fs.copy(path.resolve(__dirname, '../../', 'template/jest.config.js'), path.resolve(options.projectDir, 'jest.config.js'));
  });
}
