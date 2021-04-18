#!/usr/bin/env node

import { program } from 'commander'
import chalk from 'chalk'
import { bin, version, description, homepage } from '../package.json'
import { takeFirst } from './utils/tools'
import { main } from './main'

program
  .name(takeFirst(Object.keys(bin)) as string)
  .arguments('<project-path>')
  .description(chalk.cyan.bold(description))
  .version(version)
  .action(main)
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
