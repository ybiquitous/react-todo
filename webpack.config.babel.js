import path from 'path'
import webpack from 'webpack'
import ManifestPlugin from 'webpack-manifest-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

const outputDir = path.join(__dirname, 'public', 'assets')

const config = {
  entry: {
    scripts: './src/scripts.js',
    styles: './src/styles/index.css',
  },

  output: {
    path: outputDir,
    filename: IS_PRODUCTION ? '[name].[chunkhash].js' : '[name].js',
    publicPath: '/assets/',
  },

  devtool: 'cheap-module-inline-source-map',

  devServer: {
    contentBase: outputDir,
    compress: true,
    port: 9000,
    proxy: {
      '/': 'http://localhost:3000',
    },
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoader: 1,
                modules: true,
                minimize: IS_PRODUCTION,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: IS_PRODUCTION ? false : 'inline',
              },
            },
          ],
        }),
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin([outputDir]),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),

    new ExtractTextPlugin(
      IS_PRODUCTION ? '[name].[contenthash].css' : '[name].css',
    ),

    new ManifestPlugin({ fileName: 'files.json' }),
  ],
}

if (IS_PRODUCTION) {
  config.devtool = false

  config.plugins.push(...[new webpack.optimize.UglifyJsPlugin()])
}

export default config
