import path from 'path'
import fs from 'fs-extra'
import glob from 'glob'
import { build as esbuild } from 'esbuild'

function globToFiles(globStr: string) {
  return new Promise<string[]>((resolve, reject) => {
    glob(globStr, {}, (err, files) => {
      if (err) reject(err)
      resolve(files)
    })
  })
}

async function build() {
  const distPath = path.resolve(__dirname, '..', 'dist')
  await fs.remove(distPath)

  const entryPoints = await globToFiles('src/**/!(*.spec|*.test|*.d).ts')
  await esbuild({
    entryPoints,
    platform: 'node',
    minify: true,
    sourcemap: true,
    format: 'cjs',
    tsconfig: 'tsconfig.json',
    outdir: 'dist/src'
  })
}

build().catch((e: Error) => {
  console.error(e)
  process.exit(1)
})
