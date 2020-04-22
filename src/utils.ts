import { execSync } from 'child_process';

import fs, { ensureDirSync, existsSync, lstatSync } from 'fs-extra';
import path from 'path';

export function isValidDirectory(directory: string) {
  return existsSync(directory)
    ? lstatSync(directory).isDirectory()
    : (ensureDirSync(directory), true);
}

export function getGitUserName() {
  try {
    const stdout = execSync(`git config --get user.name`);
    return stdout.toString().replace('\n', '');
  } catch (e) {
    return '';
  }
}

export function getGitUserEmail() {
  try {
    const stdout = execSync(`git config --get user.email`);
    return stdout.toString().replace('\n', '');
  } catch (e) {
    return '';
  }
}

function refineGitRepoUrl(url: string) {
  return url
    .replace('\n', '')
    .replace('git+', '')
    .replace('.git', '');
}

export function getGitReposUrl() {
  try {
    const stdout = execSync(`git config --get remote.origin.url`);
    return refineGitRepoUrl(stdout.toString());
  } catch (e) {
    return '';
  }
}

export function getGitInfo(): GitInfo {
  return {
    username: getGitUserName(),
    email: getGitUserEmail(),
    repoUrl: getGitReposUrl(),
  };
}

export function transformGitUrlToHttpsUrl(url: string): string | void {
  const substr = url.slice(url.lastIndexOf(':') + 1);
  const [userName, repoName] = substr.split('/');
  if (userName && repoName) {
    return `https://github.com/${userName}/${repoName}`;
  }
  return '';
}

export function getPackageManager(): PackageManager {
  try {
    execSync('yarnpkg --version');
    return 'yarn';
  } catch (e) {
    return 'npm';
  }
}

export async function writeFileFromObject(
  files: FileContent,
  parentDir: string = '',
) {
  for (const filename in files) {
    if (Object.hasOwnProperty.call(files, filename)) {
      const fileContent = files[filename];
      if (typeof fileContent === 'string') {
        let filePath = path.resolve(parentDir, filename);
        if (fs.existsSync(filePath)) {
          filePath = path.resolve(parentDir, 'chore_' + filename);
        }
        await fs.ensureFile(filePath);
        await fs.writeFile(filePath, fileContent);
      } else if (typeof fileContent === 'object') {
        await writeFileFromObject(
          fileContent,
          path.resolve(parentDir, filename),
        );
      }
    }
  }
}
