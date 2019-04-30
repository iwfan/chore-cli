const { exec } = require('shelljs');
const { promisify } = require('util');

exec('git init1 ./test', { silent: true }, (a, b, c) => {
  console.log(a);
  console.log(b);
  console.log(c);
})

