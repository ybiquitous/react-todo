const path = require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const precss = require('precss')
const autoprefixer = require('autoprefixer')

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

const outputDir = path.resolve('./public')

const config = {
  entry: {
    scripts: './src/scripts.js',
    styles: './src/styles/index.css',
  },

  output: {
    path: outputDir,
    filename: IS_PRODUCTION ? '[name].[chunkhash].js' : '[name].js',
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

  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(s)?css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: IS_PRODUCTION,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [precss, autoprefixer],
                sourceMap: IS_PRODUCTION ? '' : 'inline',
              },
            },
          ],
        }),
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),

    new ExtractTextPlugin(IS_PRODUCTION ? '[name].[contenthash].css' : '[name].css'),

    new ManifestPlugin({ fileName: 'assets.json' }),
  ],
}

if (IS_PRODUCTION) {
  config.devtool = false

  config.plugins.push(...[
    new webpack.optimize.UglifyJsPlugin(),
  ])
}

module.exports = config
