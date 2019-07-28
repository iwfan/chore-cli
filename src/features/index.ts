import { Feature } from '../constants';
import { getPackageManager } from '../utils';
import addCommitLint from './addCommitlint';
import addPackageJson from './addPackageJson';
import addEditorconfig from './addEditorconfig';
import addTypescript from './addTypescript';
import addEslint from './addEslint';
import addPrettier from './addPrettier';
import addJest from './addJest';
import addBoilerplateCode from './addBoilerplateCode';
import addBrowsersList from './addBrowserslist';
import addRollup from './addRollup';
import addBabel from './addBabel';
import addLintStaged from './addLintStaged';
import addReact from './addReact';
import addWebpack from './addWebpack';

export default async function addFeatures(
  libraryDir: string,
  features: string[],
): Promise<ChoreOptions> {
  const options: ChoreOptions = {
    libraryDir: libraryDir,
    features,
    deps: [],
    devDeps: [],
    files: {},
    postInstallListener: [],
    pkgManager: getPackageManager(),
  };

  await addPackageJson(options);
  await addEditorconfig(options);
  await addTypescript(options);

  if (features.includes(Feature.REACT)) {
    await addReact(options);
  }

  await addPrettier(options);
  await addEslint(options);

  if (features.includes(Feature.STYLE)) {
    await addBrowsersList(options);
  }

  await addJest(options);
  await addBoilerplateCode(options);

  if (features.includes(Feature.ROLLUP)) {
    await addBabel(options);
    await addRollup(options);
  } else if (features.includes(Feature.WEBPACK)) {
    await addBabel(options);
    await addWebpack(options);
  }

  await addLintStaged(options);
  await addCommitLint(options);
  return options;
}
