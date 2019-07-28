type TextContent = string;
interface FileContent {
  [filename: string]: FileContent | TextContent;
}

interface ChoreOptions {
  libraryDir: string;
  features: string[];
  deps: string[];
  devDeps: string[];
  files: FileContent;
  postInstallListener: (() => void)[];
  pkgManager: string;
}

type PackageManager = 'yarn' | 'npm';

interface GitInfo {
  username: string;
  email: string;
  repoUrl: string;
}
