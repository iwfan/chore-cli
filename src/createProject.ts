import Listr from 'listr';
import fs from 'fs-extra';
import path from 'path';
import addFeatures from './features';
import getPackageManager from './helper/getPackageManager';
import writeFileFromObject from './helper/writeFileFromObjects';
import execa from 'execa';

export default async function createProject(options: ChoreOptions) {
  const tasks = new Listr([
    {
      title: 'Initialize project directory',
      task: async ({ options }) => {
        if (!fs.existsSync(options.projectDir)) {
          await fs.mkdirp(options.projectDir);
        }
        process.chdir(options.projectDir);
      },
    },
    {
      title: 'Initialize git repository',
      // @ts-ignore
      task: async (ctx, task) => {
        try {
          await execa('git', ['init']);
          Object.assign<FileContent, FileContent>(ctx.options.files, {
            '.gitignore': `node_modules`,
          });
        } catch (e) {
          task.skip('Failed to initialize git repository');
        }
      },
      skip: ({ options }) =>
        fs.existsSync(path.resolve(options.projectDir, '.git')),
    },
    {
      title: 'Analyze the required features',
      task: async ({ options }) => {
        await addFeatures(options);
      },
    },
    {
      title: 'Create files',
      task: async ({ options }) => {
        const { files } = options;
        await writeFileFromObject(files, options.projectDir);
      },
    },
    {
      title: 'Add dependencies',
      task: async ({ options }) => {
        const { deps, devDeps } = options;
        const pkgManager = getPackageManager();
        options.pkgManager = pkgManager;
        if (deps.length > 0) {
          await execa(pkgManager, ['add', ...deps]);
        }
        if (devDeps.length > 0) {
          await execa(pkgManager, ['add', ...devDeps, '-D']);
        }

        [].forEach.call(options.postInstallListener, (listener: () => void) => {
          listener.call(null);
        });
      },
    },
  ]);

  try {
    await tasks.run({ options });
  } catch (e) {
    console.log(e.message);
    try {
      await fs.remove(options.projectDir);
    } catch (e) {}
  }
}
