import path from 'path'
import fs from 'fs-extra'
import ora from 'ora'
import addFeatures from './plugins'
import { writeFileFromObject } from './utils'
import execa from 'execa'

export default async function chore({ libraryName, yes: useDefaultValue }) {
  const dir = path.resolve(process.cwd(), libraryName as string)
  const spinner = ora(`pending`)

  try {
    spinner.start()

    const options = await addFeatures(dir, features)

    const { files } = options

    await writeFileFromObject(files, options.libraryDir)

    const { deps, devDeps } = options

    if (deps.length > 0) {
      await execa(options.pkgManager, ['add', ...deps])
    }

    if (devDeps.length > 0) {
      await execa(options.pkgManager, ['add', ...devDeps, '-D'])
    }

    ;[].forEach.call(options.postInstallListener, (listener: () => void) => {
      listener.call(null)
    })
    spinner.succeed('finished!')
  } catch (e) {
    fs.removeSync(dir)
    spinner.fail('somethings went wrong!')
    console.error(e)
  }
}
