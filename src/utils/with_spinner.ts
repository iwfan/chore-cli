import ora from 'ora'

export interface SpinnerTextInfo {
  start: string
  success: string
  failed: string
}

export function withSpinner<T>(func: () => T, textInfo: SpinnerTextInfo): T | void
export function withSpinner<T>(func: () => Promise<T>, textInfo: SpinnerTextInfo): Promise<T | void>
export function withSpinner<T>(
  func: () => T | Promise<T>,
  textInfo: SpinnerTextInfo
): T | Promise<T | void> | void {
  const spinner = ora(textInfo.start)
  spinner.start()

  const setSpinnerSucceed = (d: T) => (spinner.succeed(textInfo.success), d)
  const setSpinnerFailed = (e: Error) => {
    spinner.fail(`${textInfo.failed ? textInfo.failed + ':' : ''}${e.message}`)
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
