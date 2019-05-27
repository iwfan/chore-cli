// import execa from 'execa';
import Listr from 'listr';
import fs from 'fs-extra';
import addFeatures from './features';
import getPackageManager from './helper/getPackageManager';
import writeFileFromObject from './helper/writeFileFromObjects';
import execa from "execa";


export default async function createProject(options: ChoreOptions) {

  const tasks = new Listr([
    {
      title: 'Create project directory',
      task: async ({options}) => {
        await fs.mkdirp(options.projectDir);
        process.chdir(options.projectDir);
      }
    },
    {
      title: 'Add the required features',
      task: async ({options}) => {
        await addFeatures(options);
      }
    },
    {
      title: 'Initialize git repository',
      // @ts-ignore
      task: async (ctx, task) => {
        try {
          await execa('git', ['init']);
          Object.assign<FileContent, FileContent>(ctx.options.files, {
            '.gitignore': `node_modules`
          })
        } catch (e) {
          task.skip('Failed to initialize git repository');
        }
      },
      skip: () => !options.initGitRepository,
    },
    {
      title: 'Create files',
      task: async ({options}) => {
        const {files} = options;
        await writeFileFromObject(files, options.projectDir);
      }
    },
    {
      title: 'Add dependencies',
      task: async ({options}) => {
        const {deps, devDeps} = options;
        const pkgManager = getPackageManager();
        options.pkgManager = pkgManager;
        if (deps.length > 0) {
          await execa(pkgManager, ['add', ...deps]);
        }
        if (devDeps.length > 0) {
          await execa(pkgManager, ['add', ...devDeps, '-D']);
        }
      }
    },
    {
      title: 'post install',
      task: async ({options}) => {
        [].forEach.call(options.postInstallListener, (listener: () => void) => {
          listener.call(null);
        })
      }
    }
  ]);

  try {
    await tasks.run({options});
  } catch (e) {
    try {
      await fs.remove(options.projectDir);
    } catch (e) {

    }
  }
};
