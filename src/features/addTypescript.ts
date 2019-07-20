import execa from 'execa';

export default async function(options: ChoreOptions) {
  const { features } = options;

  if (!features.includes('webpack') && !features.includes('rollup')) {
    const rawJson = options.files['package.json'];
    const pkgJson = JSON.parse(rawJson as string);
    pkgJson.scripts.build = 'tsc --outDir dist';
    pkgJson.scripts.dev = 'tsc --outDir dist --watch';
  }

  options.devDeps = [...options.devDeps, 'typescript'];

  options.postInstallListener.push(async () => {
    await execa('yarn', [
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
    ]);
  });
}
