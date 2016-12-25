const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const precss = require('precss')
const autoprefixer = require('autoprefixer')

const PRODUCTION = process.env.NODE_ENV === 'production'

const outputDir = './public'

const config = {
  entry: {
    scripts: './src/scripts.js',
    styles: './src/styles.js',
  },

  output: {
    path: outputDir,
    filename: '[name].[hash].js',
  },

  devtool: 'cheap-module-inline-source-map',

  module: {
    loaders: [
      {
        test: /\.js(x)?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
      },
      {
        test: /\.(s)?css$/,
        loader: ExtractTextPlugin.extract('style', [
          `css?importLoaders=1${PRODUCTION ? '&minimize' : ''}`,
          `postcss?${PRODUCTION ? '' : 'sourceMap=inline'}`,
        ]),
      },
    ],
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  postcss: () => [
    precss,
    autoprefixer,
  ],

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new ManifestPlugin({ fileName: 'assets.json' }),
  ],
}

if (process.env.NODE_ENV === 'production') {
  config.devtool = null

  config.plugins.push(...[
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),

    new CleanWebpackPlugin([outputDir]),
  ])
}


module.exports = config
