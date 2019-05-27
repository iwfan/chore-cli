import execa from 'execa';

export default async function (options: ChoreOptions) {

  options.devDeps = [...options.devDeps, 'typescript'];

  options.postInstallListener.push(async () => {
    await execa('yarn', ['tsc', '--init',
      '--target', 'esnext',
      '--noImplicitAny',
      '--strictNullChecks',
      '--strictFunctionTypes',
      '--strictBindCallApply',
      '--strictPropertyInitialization',
      '--noImplicitThis',
      '--alwaysStrict'])
  })
}
