#!/usr/bin/env node

import { program } from 'commander'
import { bin, version, description, homepage } from '../package.json'
import { colorizeErrorText, colorizeText, colorizeUrl } from './utils/colorizer'
import { takeFirst } from './utils/tools'
import { main } from './core/main'

program
  .name(takeFirst(Object.keys(bin)) as string)
  .arguments('<project-path>')
  .description(`🤖 ${colorizeText(description)}`)
  .version(version)
  .action(main)
  .on('--help', () => {
    console.log('')
    console.log(`📝 for more information, check out ${colorizeUrl(homepage)}`)
    console.log('')
  })
  .parseAsync(process.argv)
  .then(() => {
    console.log(colorizeText('🎉 All done, enjoy your coding time!'))
    console.log('')
  })
  .catch(e => {
    console.error(colorizeErrorText('Unhandled exception'), e)
  })

process.on('unhandledRejection', e => {
  console.error(colorizeErrorText('Unhandled exception'), e)
  process.exit(1)
})
