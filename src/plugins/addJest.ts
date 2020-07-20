import execa from 'execa';
export default async function(options: ChoreOptions) {
  options.devDeps = [...options.devDeps, 'jest', 'ts-jest', '@types/jest'];

  const rawJson = options.files['package.json'];
  const pkgJson = JSON.parse(rawJson as string);
  pkgJson.scripts.test = 'jest';

  Object.assign<FileContent, FileContent>(options.files, {
    'package.json': JSON.stringify(pkgJson, null, 2),
  });

  options.postInstallListener.push(async () => {
    await execa(options.pkgManager === 'npm' ? 'npx' : options.pkgManager, [
      'ts-jest',
      'config:init',
    ]);
  });
}
