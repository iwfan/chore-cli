type TextContent = string;
type FileContent = { [filename: string]: FileContent | TextContent };

interface ChoreOptions {
  projectDir: string;
  skipPrompts?: boolean | null;
  initGitRepository?: boolean;
  features: string[];
  deps: string[];
  devDeps: string[];
  files: FileContent;
  postInstallListener: Array<() => void>;
  pkgManager?: string;
}

type PackageManager = 'yarn' | 'npm';
