const editorconfig = `# https://github.com/browserslist/browserslist#readme

defaults
`;

export default async function(options: ChoreOptions) {
  Object.assign(options.files, {
    '.browserslistrc': editorconfig,
  });
}
