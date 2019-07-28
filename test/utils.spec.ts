import path from 'path';
import fs from 'fs-extra';
import {
  isValidDirectory,
  getGitUserName,
  getGitUserEmail,
  getGitReposUrl,
  getGitInfo,
  transformGitUrlToHttpsUrl,
} from '../src/utils';

jest.mock('child_process', () => ({
  execSync: jest.fn((args: string) => {
    if (args.includes('name')) {
      return 'iwfan';
    } else if (args.includes('email')) {
      return 'i.wangfancn@gmail.com';
    } else if (args.includes('url')) {
      return `git@github.com:iwfan/chore-cli.git\n`;
    }
    return '';
  }),
}));

describe('As a isValidDirectory', function() {
  it('should return true when give a exist directory', async function() {
    const dir = path.resolve(process.cwd(), 'chore_test_dir');
    await fs.ensureDir(dir);
    expect(isValidDirectory(dir)).toBe(true);
  });

  it('should return false when give a invalid directory', async function() {
    const filePath = path.resolve(process.cwd(), 'chore_test_file');
    await fs.ensureFile(filePath);
    expect(isValidDirectory(filePath)).toBe(false);
    fs.remove(filePath);
  });

  it('should create directory when directory is not exists', function() {
    const dir = path.resolve(process.cwd(), 'chore_test_dir');
    expect(isValidDirectory(dir)).toBeTruthy();
    expect(fs.existsSync(dir)).toBeTruthy();
    fs.remove(dir);
  });
});

describe('As a getGitInfo', function() {
  it('should return correct string', function() {
    const userName = getGitUserName();
    expect(userName).toBe('iwfan');
  });

  it('should return correct string', function() {
    const userName = getGitUserEmail();
    expect(userName).toBe('i.wangfancn@gmail.com');
  });

  it('should return correct string', function() {
    const userName = getGitReposUrl();
    expect(userName).toBe('git@github.com:iwfan/chore-cli');
  });

  it('should return git info', function() {
    const gitInfo = getGitInfo();
    expect(gitInfo).toEqual({
      username: 'iwfan',
      email: 'i.wangfancn@gmail.com',
      repoUrl: 'git@github.com:iwfan/chore-cli',
    });
  });

  it('should transform to http url', function() {
    const gitUrl = 'git@github.com:iwfan/chore-cli';
    expect(transformGitUrlToHttpsUrl(gitUrl)).toBe(
      `https://github.com/iwfan/chore-cli`,
    );
  });
});
