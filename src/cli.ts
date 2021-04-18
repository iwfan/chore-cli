#!/usr/bin/env node

import { program } from 'commander'
import chalk from 'chalk'
import { bin, version, description, homepage } from '../package.json'
// import { main } from './main'

program
  .name(Object.keys(bin)[0] ?? 'chore')
  .arguments('<project-path>')
  .option('-Y, --yes', 'use default value insteadof answer')
  .option('-S, --skip-install', 'skip install npm packages')
  .description(chalk.cyan.bold(description))
  .version(version)
  .action(() => {
    console.log('Main Action')
  })
  .on('--help', () => {
    console.log('')
    console.log(`for more information, check out ${chalk.greenBright(homepage)}`)
    console.log('')
  })
  .parseAsync(process.argv)
  .then(() => {
    console.log(chalk.green.bold('everything done, enjoy your coding time!'))
  })
  .catch(e => {
    console.error(chalk.red.bold('Unhandled exception'), e)
  })

process.on('unhandledRejection', e => {
  console.error(chalk.red.bold('Unhandled exception'), e)
  process.exit(1)
})
