import { Feature } from '../constants';

export default async function(options: ChoreOptions) {
  const { features } = options;
  const eslintConfig: any = {
    extends: [
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 9,
      sourceType: 'module',
    },
    ignorePatterns: ['node_modules/', 'dist/'],
    rules: {},
  };

  options.devDeps = [...options.devDeps, 'eslint'];

  options.devDeps = [
    ...options.devDeps,
    '@typescript-eslint/parser',
    '@typescript-eslint/eslint-plugin',
    'eslint-plugin-prettier',
    'eslint-config-prettier',
  ];

  if (features.includes(Feature.REACT)) {
    eslintConfig.extends.unshift('plugin:react/recommended');
    eslintConfig.parserOptions.ecmaFeatures = {
      jsx: true,
    };
    eslintConfig.settings = {
      react: { version: 'detect' },
    };
    options.devDeps = [...options.devDeps, 'eslint-plugin-react'];
  }

  Object.assign<FileContent, FileContent>(options.files, {
    '.eslintrc': JSON.stringify(eslintConfig, null, 2),
  });
}
