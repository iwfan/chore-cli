export default async function (options: ChoreOptions) {
  const { features } = options;
  const eslintConfig: any = {
    'env': {
      'browser': true,
      'node': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
      'ecmaVersion': 9,
      'sourceType': 'module',
    },
    'rules': {}
  };

  options.devDeps = [...options.devDeps, 'eslint'];

  if (features.includes('typescript')) {
    eslintConfig.parser = '@typescript-eslint/parser';
    eslintConfig.extends = ['plugin:@typescript-eslint/recommended'];
    options.devDeps = [...options.devDeps, '@typescript-eslint/parser', '@typescript-eslint/eslint-plugin'];
  }

  if (features.includes('react')) {
    eslintConfig.extends.unshift('plugin:react/recommended');
    eslintConfig.parserOptions.ecmaFeatures = {
      jsx: true
    };
    eslintConfig.settings = {
      react: { version: 'detect' }
    };
    options.devDeps = [...options.devDeps, 'eslint-plugin-react'];
  }

  if (features.includes('prettier')) {
    if (features.includes('typescript')) {
      eslintConfig.extends.push('prettier/@typescript-eslint');
    }
    eslintConfig.extends.push('plugin:prettier/recommended');
    options.devDeps = [...options.devDeps, 'eslint-plugin-prettier', 'eslint-config-prettier'];
  }

  Object.assign<FileContent, FileContent>(options.files, {
    '.eslintrc.js': 'module.exports = ' + JSON.stringify(eslintConfig, null, 2)
  });
}
