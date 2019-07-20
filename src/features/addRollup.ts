export default async function addRollup(options: ChoreOptions) {

  const rawConfig = `import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

export default {
  input: './src/index.ts',

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en#external-e-external
  external: [],

  plugins: [
    // Allows node_modules resolution
    resolve({ extensions }),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),

    // Compile TypeScript/JavaScript files
    babel({ extensions, include: ['src/**/*'] }),
  ],

  output: [{
    file: pkg.main,
    format: 'cjs',
  }],
};
  `


  const rawJson = options.files['package.json'];
  const pkgJson = JSON.parse(rawJson as string);
  pkgJson.scripts.build = 'rollup -c';

  options.devDeps = [...options.devDeps, 'rollup','rollup-plugin-babel', 'rollup-plugin-node-resolve', 'rollup-plugin-commonjs'];


  Object.assign<FileContent, FileContent>(options.files, {
    'rollup.config.js': rawConfig,
    'package.json': JSON.stringify(pkgJson, null, 2)
  });
}
