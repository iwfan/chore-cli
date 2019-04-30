#!/usr/bin/env node

// import path from 'path';
// import {exec, error} from 'shelljs';
import cli from 'commander';


// import { version } from '../package.json';
// // console.log(shelljs.echo(path.resolve(__dirname)));
// const result = exec(`git1 init ${path.resolve(__dirname, 'test')}`, {async: true,silent: true})
// result.on('error', (err) => {
//   console.log(err)
// })
// console.log(result)
//
// cli.version(version);
//
cli.option('-y', 'stasast')
cli.parse(process.argv);
//
// console.log('end')
