import prettier from 'prettier';

export default async function addWebpack(options: ChoreOptions) {
  const rawJson = options.files['package.json'];
  const pkgJson = JSON.parse(rawJson as string);

  const rawConfig = `
    import path from 'path';
    import webpack from 'webpack';
    import HtmlWebpackPlugin from 'html-webpack-plugin';
    
    const config: webpack.Configuration = {
      mode: 'development',
      entry: './src/index',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
      },
      module: {
        rules: [
          {
            test: /\\.(ts|js)x?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          },
        ],
      },
      devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 1125,
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'public', 'index.html'),
          title: '${pkgJson.name}',
          favicon: '',
          minify: {
            removeAttributeQuotes: true,
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
          },
        }),
      ],
    };
    
    export default config;
  `;

  const rawHtml = `
    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title><%= htmlWebpackPlugin.options.title %></title>
    </head>
    <body>
    <div id="root"></div>
    </body>
    </html>
  `;

  pkgJson.scripts.start =
    'webpack-dev-server --process --color --config webpack.config.ts';
  pkgJson.scripts.build = 'webpack --config webpack.config.ts';

  options.devDeps = [
    ...options.devDeps,
    'webpack',
    'webpack-cli',
    'webpack-dev-server',
    '@types/webpack',
    '@types/webpack-dev-server',
    'html-webpack-plugin',
    '@types/html-webpack-plugin',
    'babel-loader',
    'ts-node',
  ];

  Object.assign<FileContent, FileContent>(options.files, {
    'webpack.config.ts': prettier.format(rawConfig, { parser: 'babel' }),
    'package.json': JSON.stringify(pkgJson, null, 2),
    public: {
      'index.html': prettier.format(rawHtml, { parser: 'html' }),
    },
  });
}
