interface ChoreOptions {
  libraryDir: string;
  features: string[];
  deps: string[];
  devDeps: string[];
  files: FileContent;
  postInstallListener: (() => void)[];
  pkgManager: string;
}


interface GitInfo {
  username: string;
  email: string;
  repoUrl: string;
}
