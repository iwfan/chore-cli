import path from 'path'
import fs from 'fs-extra'

export async function copy() {
  console.log(' Copy Files ')
  const distPath = path.resolve(__dirname, '..', 'dist')
  const distFolderExists = await fs.pathExists(distPath)

  if (!distFolderExists) {
    throw new Error('Can not found dist folder')
  }

  const featurePath = path.resolve(__dirname, '..', 'src', 'features')
  const featureList = await fs.readdir(featurePath)

  for (const feature of featureList) {
    const templatePath = path.resolve(featurePath, feature, 'templates')
    if (await fs.pathExists(templatePath)) {
      const distTemplatePath = path.resolve(distPath, 'src', 'features', feature, 'templates')
      await fs.copy(templatePath, distTemplatePath, { overwrite: true })
    }
  }

  for (const file of ['.prettierrc', 'package.json', 'README.md']) {
    await fs.copy(path.resolve(__dirname, '..', file), path.resolve(distPath, file), {
      overwrite: true
    })
  }

  console.log('😌 All files has been copied to dist folder')
}
