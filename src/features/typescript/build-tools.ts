export enum BUILD_TOOLS {
  TSC,
  WEBPACK,
  ROLLUP
  // PARCEL,
  // ESBUILD,
  // SNOWPACK
}

const LabelMappings = [
  'None(Just use the TypeScript compiler)',
  'webpack',
  'Rollup'
  // 'Parcel',
  // 'esbuild',
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
