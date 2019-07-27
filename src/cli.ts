#!/usr/bin/env node

import yargs from 'yargs';
import chore from './chore';

yargs
  .command(
    '$0 <library-name>',
    '️Chore CLI is the Tooling for building a front-end library.',
    {},
    chore,
  )
  .option('y', {
    alias: 'yes',
    type: 'boolean',
    describe: 'Use default values for all fields',
  })
  .help()
  .alias('v', 'version')
  .epilogue(
    'for more information, check out https://github.com/iwfan/chore-cli',
  )
  .parse();
