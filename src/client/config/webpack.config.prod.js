const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

/** Consider add
 * AggressiveSplittingPlugin
 * Compression Plugin
 * Reference: https://stackoverflow.com/questions/35054082/webpack-how-to-build-production-code-and-how-to-use-it
 */
module.exports = merge(baseConfig, {
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
    }),
  ],
});
