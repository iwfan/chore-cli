#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import { bin, version, description, homepage } from '../package.json';
import { main } from './main';

program
  .name(Object.keys(bin)[0] ?? 'chore')
  .arguments('<library-path>')
  .option('-Y, --yes', 'use default value insteadof answer')
  .option('-S, --skip-install', 'skip install npm packages')
  .description(description)
  .version(version)
  .action(main)
  .on('--help', () => {
    console.log('');
    console.log(`for more information, check out ${homepage}`);
    console.log('');
  })
  .parseAsync(process.argv)
  .then(d => {
    console.log(chalk.green.bold('DONE'));
  })
  .catch(e => {
    console.error(chalk.red.bold('Something went wrong'));
  });
