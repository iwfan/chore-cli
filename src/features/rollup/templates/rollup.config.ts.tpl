import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import pkg from './package.json'

export default {
  input: './src/index.ts',

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en#external-e-external
  external: [],
  watch: {
    include: 'src/**'
  },
  plugins: [
    // Allows node_modules resolution
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs({ include: 'node_modules/**' }),

    // Compile TypeScript/JavaScript files
    babel({
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.es6', '.es', '.mjs'],
      include: ['src/**/*'],
      exclude: 'node_modules/**',
      babelHelpers: 'runtime'
    })
  ],

  output: [
    { file: pkg.main, name: '<LIBRARY_NAME>', format: 'umd', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true }
  ]
}
