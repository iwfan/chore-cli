import addCommitlint from "./addCommitlint";
import addPackageJson from "./addPackageJson";
import addEditorconfig from "./addEditorconfig";
import addTypescript from './addTypescript';
import addEslint from "./addEslint";
import addPrettier from "./addPrettier";
// const featureMap = {
//   'typescript': function () {
//   },
//   'webpack': function () {
//   },
// }


export default async function addFeatures(options: ChoreOptions) {
  await addEditorconfig(options);
  await addPackageJson(options);
  await addCommitlint(options);
  await addTypescript(options);
  await addPrettier(options);
  await addEslint(options);

}
