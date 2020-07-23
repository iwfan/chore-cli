/**
 *
 */
import { NodeDependency, Path } from './typing';
import path from 'path';

export const applyTemplates = (path: Path, data: any) => {
  path.resolve();
};

export const addPackageJsonDependency = (dependency: NodeDependency) => {

}
  patchJson() {}
  patchYaml() {}
  applyTemplates() {}
  query() {}


class ChoreBoy {
  private context: ChoreContext = new Context();

  private constructor(cwd: Path, pkgMgr: PackageManager) {}
  public pipe(...chores: Chore[]): ChoreContext {
    return this.context;
  }
}

/**
 * chore_boy.pipe()
 */
