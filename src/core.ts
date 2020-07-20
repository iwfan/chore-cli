type TextContent = string;

// interface FileContent {
//   [filename: string]: TextContent;
// }

class FileContent {
  private files: { [filename: string]: string } = {};

  public push(path: string, content: string) {
    if (!this.files[path]) {
      this.files[path] = content;
    }
  }

  public query(path: string): string {
    return this.files[path];
  }

  public update(path: string, content: string) {
    this.files[path] = content;
  }
}

type PackageManager = 'yarn' | 'npm';

interface Context {
  dir: string;
  packageManager: PackageManager;
  features: string[];
  deps: string[];
  devDeps: string[];
  files: FileContent;
}
