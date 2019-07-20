import fs from 'fs-extra';
import path from 'path';

export default async function writeFileFromObject(
  files: FileContent,
  parentDir: string = '',
) {
  for (const filename in files) {
    if (Object.hasOwnProperty.call(files, filename)) {
      const fileContent = files[filename];
      if (typeof fileContent === 'string') {
        await fs.ensureFile(path.resolve(parentDir, filename));
        await fs.writeFile(path.resolve(parentDir, filename), fileContent);
      } else if (typeof fileContent === 'object') {
        await writeFileFromObject(
          fileContent,
          path.resolve(parentDir, filename),
        );
      }
    }
  }
}
