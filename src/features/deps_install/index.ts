import type { FeatureSetup, QuestionBuilder } from '../../types'
import { DependencyType, getDepsCollection } from '../../core/dependency'
import { exec, readStdout } from '../../utils/executor'
import { buildListQuestion } from '../../core/question'
import { takeFirst } from '../../utils/tools'
import { withSpinner } from '../../utils/with_spinner'

export const questionBuilder: QuestionBuilder = async context => {
  const pkgList = []

  const pnpmVersion = await readStdout('pnpm --version')
  if (pnpmVersion) {
    pkgList.push({ name: `pnpm (${pnpmVersion})`, value: 'pnpm add' })
  }

  const yarnVersion = await readStdout('yarn --version')
  if (yarnVersion) {
    pkgList.push({ name: `yarn (${pnpmVersion})`, value: 'yarn add' })
  }

  const npmVersion = await readStdout('npm --version')
  if (npmVersion) {
    pkgList.push({ name: `npm (${npmVersion})`, value: 'npm install' })
  }

  if (pkgList.length === 1) {
    context.answers.packageManager = takeFirst<{ name: string; value: string }>(pkgList)?.value
    return
  }

  return buildListQuestion(
    'packageManager',
    '📦 Which package manager do you want to use?',
    pkgList
  )
}

export const setup: FeatureSetup = async context => {
  const {
    rootPath,
    answers: { packageManager }
  } = context

  await withSpinner(
    async () => {
      if (!Boolean(packageManager)) {
        throw new Error('Can not found package manager.')
      }

      const previousPath = process.cwd()
      process.chdir(rootPath)

      const deps = getDepsCollection()
      const dependencies = deps
        .filter(dep => dep.type === DependencyType.DEFAULT)
        .map(dep => dep.name)

      if (dependencies.length) {
        try {
          await exec(`${packageManager} --save ${dependencies.join(' ')}`)
        } catch {
          throw new Error(`🚨 Dependencies installation failed! ${dependencies.join(' ')}`)
        }
      }

      const devDependencies = deps
        .filter(dep => dep.type === DependencyType.DEV)
        .map(dep => dep.name)
      if (devDependencies.length) {
        try {
          await exec(`${packageManager} --save-dev ${devDependencies.join(' ')}`)
        } catch {
          throw new Error(`🚨 Dependencies installation failed! ${devDependencies.join(' ')}`)
        }
      }

      const peerDependencies = deps
        .filter(dep => dep.type === DependencyType.PEER)
        .map(dep => dep.name)
      if (peerDependencies.length) {
        try {
          await exec(`${packageManager} --save-peer ${peerDependencies.join(' ')}`)
        } catch {
          throw new Error(`🚨 Dependencies installation failed! ${peerDependencies.join(' ')}`)
        }
      }

      process.chdir(previousPath)
    },
    {
      start: '🧩 Installing dependencies',
      success: '🎊 Dependencies installed successfully!',
      failed: '🚨 Dependencies installation failed!'
    }
  ).catch()
}
