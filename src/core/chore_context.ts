import {
  ChoreContextData,
  NodeDependency,
  PackageManager,
  Path,
} from '../typing';

const contextData: ChoreContextData = {
  files: {},
  deps: {},
};


export class ChoreContext {
  private data:

  public addPackageJsonDependency(dependency: NodeDependency) {}
  public patchJson() {}
  public patchYaml() {}
  public applyTemplates() {}
  public query() {}
}
