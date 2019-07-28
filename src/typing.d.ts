type TextContent = string;
type FileContent = { [filename: string]: FileContent | TextContent };

interface ChoreOptions {
  libraryDir: string;
  features: string[];
  deps: string[];
  devDeps: string[];
  files: FileContent;
  postInstallListener: Array<() => void>;
  pkgManager: string;
}

type PackageManager = 'yarn' | 'npm';

interface GitInfo {
  username: string;
  email: string;
  repoUrl: string;
}
