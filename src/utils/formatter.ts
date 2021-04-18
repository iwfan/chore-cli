import prettier from 'prettier'
import type { Options } from 'prettier'
import fs from 'fs-extra'
import path from 'path'

let config: Options

const formatter = async (source: string, parser?: Options['parser']): Promise<string> => {
  if (!config) {
    const configFile = path.resolve(__dirname, '..', '..', '.prettierrc')
    config = await fs.readJSON(configFile, { encoding: 'utf8' })
  }

  config.parser = parser ?? 'babel'
  return prettier.format(source, config)
}

export default formatter
