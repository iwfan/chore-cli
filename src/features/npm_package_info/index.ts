import { basename, resolve } from 'path';
import ejs from 'ejs';

export const templates = [resolve(__dirname, './templates/package.json.tpl')];

export const a = async () => {
  const appName = basename('/Users/f/Documents/github_repo/chore-cli/src/abc');

  const data = await ejs.renderFile(
    resolve(__dirname, './templates/package.json.tpl'),
    {
      projectName: appName,
      username: '123',
      email: '123',
      repoUrl: '4567',
    },
  );
  console.log(data);
};

a();
