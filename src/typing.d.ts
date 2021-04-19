type TextContent = string
type Path = string
type PackageManager = 'yarn' | 'npm'

export enum NodeDependencyType {
  Default,
  Dev,
  Peer
}

interface NodeDependency {
  name: string
  version: string
  type: NodeDependencyType
}

interface FileTree {
  [pathToFile: string]: TextContent | FileTree
}

interface TempFileSystem {
  files: FileTree
  deps: {
    default?: string[]
    dev?: string[]
    peer?: string[]
  }
}

interface ChoreContext {
  cwd: string
  pkgMgr: PackageManager
  tasks: string[]
}

interface Chore {
  (context: ChoreContext): Promise<void>
}

interface GitInfo {
  username: string
  email: string
  repoUrl: string
}
