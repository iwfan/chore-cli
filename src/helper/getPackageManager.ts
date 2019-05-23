import execa from 'execa';

let installedPackageManager: PackageManager = 'npm';

const getPackageManager: () => PackageManager = () => {
  try {
    execa.sync('yarnpkg', ['--version']);
    installedPackageManager = 'yarn';
  } catch (e) {
  }

  return installedPackageManager;
};

export default getPackageManager;
