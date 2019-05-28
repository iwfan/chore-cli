const execa = require('execa');
const chalk = require('chalk');
const Listr = require('listr');

const result = execa('git', ['config', 'user.email']).then(data => {
  console.log(data.stdout);
}).catch(e => {
  console.log(e.message);
});
