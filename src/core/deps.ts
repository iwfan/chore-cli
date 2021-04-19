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
