export default async function(options: ChoreOptions) {
  const rawJson = options.files['package.json'];
  const pkgJson = JSON.parse(rawJson as string);

  let hooks = pkgJson['husky'];

  if (!hooks) {
    hooks = pkgJson['husky'] = {};
  }

  hooks['pre-commit'] = 'lint-staged';

  pkgJson['lint-staged'] = {
    '*.{js,json,scss,css,md}': ['prettier --write', 'git add'],
    '*.{ts,tsx}': ['prettier --write', 'eslint --fix', 'git add'],
  };

  Object.assign<FileContent, FileContent>(options.files, {
    'package.json': JSON.stringify(pkgJson, null, 2),
  });

  options.devDeps = [...options.devDeps, 'husky', 'lint-staged'];
}
