const execa = require('execa');
const chalk = require('chalk');

const result = execa('git1', ['init'], {
  cwd: './test',
});

if (result.failed) {
  console.log(chalk.red.bold('Failed to initialize git repository'));
}
