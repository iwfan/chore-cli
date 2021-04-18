import path from 'path';
import { getGitInfo, transformGitUrlToHttpsUrl } from '../utils';

export default async function(options: ChoreOptions) {
  const { libraryDir } = options;
  const appName = path.basename(libraryDir);
  const gitInfo = await getGitInfo();
  const repoUrl = transformGitUrlToHttpsUrl(gitInfo.repoUrl);
  const pkgJson = {
    name: appName,
    version: '0.1.0',
    description: `${appName} is generated by chore-cli.`,
    main: 'dist/index.js',
    module: `dist/${appName}.esm.js`,
    typings: 'dist/index.d.ts',
    scripts: {
      test: 'echo "Error: no test specified" && exit 1',
    },
    repository: {
      type: 'git',
      url: `git+${repoUrl}.git`,
    },
    keywords: ['chore', 'chore-cli'],
    author: {
      name: gitInfo.username,
      email: gitInfo.email,
    },
    license: 'MIT',
    bugs: {
      url: `${repoUrl}/issues`,
    },
    homepage: `${repoUrl}#readme`,
    files: ['dist'],
  };

  Object.assign<FileContent, FileContent>(options.files, {
    'package.json': JSON.stringify(pkgJson, null, 2),
  });
}