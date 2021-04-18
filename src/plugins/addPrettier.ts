export default async function (options: ChoreOptions) {
  const prettierConfig = {
    trailingComma: 'none',
    singleQuote: true,
    semi: false,
    arrowParens: 'avoid',
    printWidth: 100,
    jsxSingleQuote: true,
    quoteProps: 'preserve'
  }

  Object.assign<FileContent, FileContent>(options.files, {
    '.prettierrc': JSON.stringify(prettierConfig, null, 2)
  })

  options.devDeps = [...options.devDeps, 'prettier', 'pretty-quick']
}
