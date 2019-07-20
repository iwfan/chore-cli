const editorconfig = `# https://github.com/browserslist/browserslist#readme

>= 1%
last 1 major version
not dead
not ie <= 11
`;

export default async function(options: ChoreOptions) {
  Object.assign(options.files, {
    '.browserslistrc': editorconfig,
  });
}
