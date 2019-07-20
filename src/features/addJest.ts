export default async function(options: ChoreOptions) {
  const { features } = options;

  const babelConfig: any = {
    presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
  };

  options.devDeps = [
    ...options.devDeps,
    'jest',
    'babel-jest',
    '@babel/core',
    '@babel/preset-env',
  ];
  if (features.includes('typescript')) {
    babelConfig.presets.push('@babel/preset-typescript');
    options.devDeps.push(
      '@babel/preset-typescript',
      '@types/jest',
      '@types/node',
    );
  }

  const rawJson = options.files['package.json'];
  const pkgJson = JSON.parse(rawJson as string);
  pkgJson.scripts.test = 'jest';

  Object.assign<FileContent, FileContent>(options.files, {
    '.babelrc': JSON.stringify(babelConfig, null, 2),
    'package.json': JSON.stringify(pkgJson, null, 2),
  });
}
