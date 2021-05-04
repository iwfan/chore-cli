import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import sourceMaps from 'rollup-plugin-sourcemaps'
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
    nodeResolve(),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),

    // Compile TypeScript/JavaScript files
    babel({ extensions: ['.js', '.jsx', '.es6', '.es', '.mjs'], include: ['src/**/*'], babelHelpers: 'runtime' }),

    // Resolve source maps to the original source
    sourceMaps()
  ],

  output: [
    { file: pkg.main, name: '<LIBRARY_NAME>', format: 'umd', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true }
  ]
}
