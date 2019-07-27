import execa from 'execa';
import { Feature } from '../constants';

export default async function(options: ChoreOptions) {
  const { features } = options;

  if (
    !features.includes(Feature.WEBPACK) &&
    !features.includes(Feature.ROLLUP)
  ) {
    const rawJson = options.files['package.json'];
    const pkgJson = JSON.parse(rawJson as string);
    pkgJson.scripts.build = 'tsc --outDir dist';
    pkgJson.scripts.dev = 'tsc --outDir dist --watch';
    Object.assign<FileContent, FileContent>(options.files, {
      'package.json': JSON.stringify(pkgJson, null, 2),
    });
  }

  options.devDeps = [...options.devDeps, 'typescript'];

  options.postInstallListener.push(async () => {
    const argument = [
      'tsc',
      '--init',
      '--target',
      'esnext',
      '--noImplicitAny',
      '--strictNullChecks',
      '--strictFunctionTypes',
      '--strictBindCallApply',
      '--strictPropertyInitialization',
      '--noImplicitThis',
      '--alwaysStrict',
    ];
    if (features.includes(Feature.REACT)) {
      argument.push('--jsx', 'react');
    }

    await execa(
      options.pkgManager === 'npm' ? 'npx' : options.pkgManager,
      argument,
    );
  });
}
