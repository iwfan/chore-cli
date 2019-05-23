const execa = require('execa');

let installedPackageManager = '';

const getInstalledPackageManager = () => {

  if (installedPackageManager.length > 0) {
    return installedPackageManager;
  }

  try {
    execa.sync('yarnpkg', ['--version']);
    installedPackageManager = 'yarn';
  } catch (e) {
    installedPackageManager = 'npm';
  }

  return installedPackageManager;
};

module.exports = getInstalledPackageManager;
