import { ensureFile, writeFile } from 'fs-extra'
import { renderFile } from 'ejs'
import type { Data } from 'ejs'

export const rederTemplate = async (path: string, templatePath: string, data?: Data) => {
  const content = await renderFile(templatePath, data, {})
  await ensureFile(path)
  await writeFile(path, content)
}
