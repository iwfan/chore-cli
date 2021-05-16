export enum BUILD_TOOLS {
  TSC,
  ESBUILD,
  SNOWPACK,
  WEBPACK,
  ROLLUP
  // PARCEL,
}

const LabelMappings = [
  'None(Just use the TypeScript compiler)',
  'esbuild',
  'Snowpack',
  'webpack',
  'Rollup'
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
    default: BUILD_TOOLS.TSC
  }
}
