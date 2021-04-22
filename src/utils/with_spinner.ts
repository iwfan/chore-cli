import ora from 'ora'

export interface SpinnerTextInfo {
  start: string
  success: string
  failed: string
}

export function withSpinner<T>(func: () => T, textInfo: SpinnerTextInfo): T
export function withSpinner<T>(func: () => Promise<T>, textInfo: SpinnerTextInfo): Promise<T>
export function withSpinner<T>(func: () => T | Promise<T>, textInfo: SpinnerTextInfo) {
  const spinner = ora(textInfo.start)
  spinner.start()

  const setSpinnerSucceed = (d: T) => (spinner.succeed(textInfo.success), d)
  const setSpinnerFailed = (e: Error) => {
    spinner.fail(e.message ?? textInfo.failed)
    throw e
  }

  let result: T | Promise<T | void> | void

  try {
    const r = func()

    if (r instanceof Promise) {
      result = r.then(setSpinnerSucceed, setSpinnerFailed)
    } else {
      result = setSpinnerSucceed(r)
    }
  } catch (e) {
    setSpinnerFailed(e)
  }

  return result
}
