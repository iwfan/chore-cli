import addCommitlint from './addCommitlint';
import addPackageJson from './addPackageJson';
import addEditorconfig from './addEditorconfig';
import addTypescript from './addTypescript';
import addEslint from './addEslint';
import addPrettier from './addPrettier';
import addJest from './addJest';
import addBoilerplateCode from './addBoilerplateCode';
import addBrowsersList from './addBrowserslist';
import addRollup from './addRollup';
import { addBabel } from './addBabel';

export default async function addFeatures(options: ChoreOptions) {
  const { features } = options;
  await addPackageJson(options);
  await addEditorconfig(options);
  await addBrowsersList(options);
  await addPrettier(options);
  await addCommitlint(options);

  if (features.includes('typescript')) {
    await addTypescript(options);
  }
  await addEslint(options);
  await addJest(options);
  if (features.includes('rollup')) {
    await addBabel(options);
    await addRollup(options);
  }
  await addBoilerplateCode(options);
}
