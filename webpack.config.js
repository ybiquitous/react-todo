/* eslint 'import/no-extraneous-dependencies': ['error', {devDependencies: true}] */
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const precss = require('precss')
const autoprefixer = require('autoprefixer')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    scripts: './src/scripts.js',
    styles: './src/styles.js'
  },
  output: {
    path: './build',
    filename: '[name].[hash].js'
  },
  devtool: isProduction ? null : 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.js(x)?$/,
        exclude: /(node_modules)/,
        loader: 'babel'
      },
      {
        test: /\.(s)?css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          `css?importLoaders=1&${isProduction ? 'minimize' : ''}`,
          `postcss?${isProduction ? '' : 'sourceMap=inline'}`
        )
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  postcss: () => [
    precss,
    autoprefixer
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new ManifestPlugin()
  ].concat(isProduction ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ] : [])
}
