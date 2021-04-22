import { ensureFile, writeFile } from 'fs-extra'
import { renderFile } from 'ejs'
import type { Data } from 'ejs'
import { formatter } from '../utils/formatter'

export const rederTemplate = async (path: string, templatePath: string, data?: Data) => {
  let content = await renderFile(templatePath, data, {})
  await ensureFile(path)

  if (data && data.__prettier_parser != null) {
    content = await formatter(content, data.__prettier_parser)
  }

  await writeFile(path, content)
}
