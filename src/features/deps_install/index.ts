import type { FeatureSetup, QuestionBuilder } from '../../types'
import { DependencyType, getDepsCollection } from '../../core/dependency'
import { exec, readStdout } from '../../utils/executor'
import { buildListQuestion } from '../../core/question'
import { takeFirst } from '../../utils/tools'
import { withSpinner } from '../../utils/with_spinner'

export enum PackageManager {
  NPM,
  YARN,
  PNPM
}

const INSTALL_CMD_MAPPING: Record<string, string> = {
  [PackageManager.NPM]: 'npm install',
  [PackageManager.YARN]: 'yarn add',
  [PackageManager.PNPM]: 'pnpm add'
}

export const questionBuilder: QuestionBuilder = async context => {
  const pkgList = []

  const pnpmVersion = await readStdout('pnpm --version')
  if (pnpmVersion) {
    pkgList.push({ name: `pnpm (${pnpmVersion})`, value: PackageManager.PNPM })
  }

  const yarnVersion = await readStdout('yarn --version')
  if (yarnVersion) {
    pkgList.push({ name: `yarn (${pnpmVersion})`, value: PackageManager.YARN })
  }

  const npmVersion = await readStdout('npm --version')
  if (npmVersion) {
    pkgList.push({ name: `npm (${npmVersion})`, value: PackageManager.NPM })
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
      if (packageManager == null) {
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
          await exec(`${INSTALL_CMD_MAPPING[packageManager]} --save ${dependencies.join(' ')}`)
        } catch {
          throw new Error(`🚨 Dependencies installation failed! ${dependencies.join(' ')}`)
        }
      }

      const devDependencies = deps
        .filter(dep => dep.type === DependencyType.DEV)
        .map(dep => dep.name)
      if (devDependencies.length) {
        try {
          await exec(
            `${INSTALL_CMD_MAPPING[packageManager]} --save-dev ${devDependencies.join(' ')}`
          )
        } catch {
          throw new Error(`🚨 Dependencies installation failed! ${devDependencies.join(' ')}`)
        }
      }

      const peerDependencies = deps
        .filter(dep => dep.type === DependencyType.PEER)
        .map(dep => dep.name)
      if (peerDependencies.length) {
        try {
          await exec(
            `${INSTALL_CMD_MAPPING[packageManager]} --save-peer ${peerDependencies.join(' ')}`
          )
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
