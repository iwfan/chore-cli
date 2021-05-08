export enum BUILD_TOOLS {
  SNOWPACK,
  ESBUILD,
  WEBPACK,
  ROLLUP,
  TSC
  // PARCEL,
}

const LabelMappings = [
  'Snowpack',
  'esbuild',
  'webpack',
  'Rollup',
  'None(Just use the TypeScript compiler)'
  // 'Parcel',
]

export const buildTools = () => {
  const choices = LabelMappings.map((name, value) => ({
    name,
    value
  }))

  return {
    type: 'list',
    name: 'buildTool',
    message: '🛠  Which build tool do you want to use?',
    choices,
    default: BUILD_TOOLS.SNOWPACK
  }
}
