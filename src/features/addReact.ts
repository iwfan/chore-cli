export default async function(options: ChoreOptions) {
  options.deps = [...options.deps, 'react', 'react-dom'];
  options.devDeps = [...options.devDeps, '@types/react', '@types/react-dom'];
}
