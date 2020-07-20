export default async function(options: ChoreOptions) {
  const rawJson = options.files['package.json'];
  const pkgJson = JSON.parse(rawJson as string);

  let hooks = pkgJson['husky'].hooks;

  hooks['commit-msg'] = 'commitlint -E HUSKY_GIT_PARAMS';

  pkgJson['commitlint'] = {
    extends: ['@commitlint/config-conventional'],
  };

  Object.assign<FileContent, FileContent>(options.files, {
    'package.json': JSON.stringify(pkgJson, null, 2),
  });

  options.devDeps = [
    ...options.devDeps,
    'husky',
    '@commitlint/config-conventional',
    '@commitlint/cli',
  ];
}
