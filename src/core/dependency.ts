export enum DependencyType {
  DEFAULT,
  DEV,
  PEER
}

export interface Dependency {
  name: string
  type: DependencyType
}

const deps = new Set<Dependency>()

export function addDep(name: string): void
export function addDep(name: string, type: DependencyType): void
export function addDep(name: string, type?: DependencyType): void {
  deps.add({ name, type: type ?? DependencyType.DEFAULT })
}

export function addDeps(deps: string[]) {
  for (const dep of deps) {
    addDep(dep, DependencyType.DEFAULT)
  }
}

export function addDevDeps(deps: string[]) {
  for (const dep of deps) {
    addDep(dep, DependencyType.DEV)
  }
}

export function addPeerDevDeps(deps: string[]) {
  for (const dep of deps) {
    addDep(dep, DependencyType.PEER)
  }
}

export function getDepsCollection() {
  return Array.from(deps)
}
