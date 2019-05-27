export default async function (options: ChoreOptions) {
  const prettierConfig = {
    trailingComma: 'all',
    singleQuote: true,
    semi: true,
    printWidth: 80,
  }

  Object.assign<FileContent, FileContent>(options.files, {
    '.prettierrc.js': 'module.exports = ' + JSON.stringify(prettierConfig, null, 2)
  });

  options.devDeps = [...options.devDeps, 'prettier'];
}
