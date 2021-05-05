export enum BUILD_TOOLS {
  TSC,
  ESBUILD,
  WEBPACK,
  ROLLUP
  // PARCEL,
  // SNOWPACK
}

const LabelMappings = [
  'None(Just use the TypeScript compiler)',
  'esbuild',
  'webpack',
  'Rollup'
  // 'Parcel',
  // 'Snowpack'
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
