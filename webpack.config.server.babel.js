import ExtractTextPlugin from 'extract-text-webpack-plugin'
import nodeExternals from 'webpack-node-externals'

export default {
  target: 'node',

  entry: './server.js',

  output: {
    path: __dirname,
    filename: 'server.bundle.js',
  },

  externals: [nodeExternals()],

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
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
              },
            },
          ],
        }),
      },
    ],
  },

  plugins: [new ExtractTextPlugin('tmp/server.css')],
}
