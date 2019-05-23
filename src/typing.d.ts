interface ChoreOptions {
  projectDir: string;
  skipPrompts: boolean | null;
  initGitRepository?: boolean;
}

type PackageManager = 'yarn' | 'npm';
