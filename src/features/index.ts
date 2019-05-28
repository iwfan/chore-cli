import addCommitlint from './addCommitlint';
import addPackageJson from './addPackageJson';
import addEditorconfig from './addEditorconfig';
import addTypescript from './addTypescript';
import addEslint from './addEslint';
import addPrettier from './addPrettier';
import addJest from './addJest';
import addBoilerplateCode from './addBoilerplateCode';


export default async function addFeatures(options: ChoreOptions) {
  const { features } = options;
  await addPackageJson(options);
  await addEditorconfig(options);
  await addPrettier(options);
  await addCommitlint(options);

  if (features.includes('typescript')) {
    await addTypescript(options);
  }

  if (features.includes('webpack')) {
    // await addTypescript(options);
  }
  if (features.includes('rollup')) {
    // await addTypescript(options);
  }
  await addEslint(options);
  await addJest(options);
  await addBoilerplateCode(options);
}
