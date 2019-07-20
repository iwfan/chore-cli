const chalk = require('chalk');
const ora = require('ora');

const spinner = ora(`Failed to create ${chalk.bold.red('ABC')}`);

spinner.start('start');
spinner.fail('fail');
