const { exec } = require('shelljs');

const promisifyExec = (command, option = { silent: true }) =>
  new Promise((resolve, reject) => {
      exec(command, option, (code, stdout, stderr) => {
        if (code === 0) {
          resolve(stdout);
        } else {
          reject(stderr);
        }
      })
  });

module.exports = { promisifyExec };
