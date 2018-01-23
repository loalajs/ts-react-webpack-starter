const webpack = require('webpack');
/** CompressionPlugin require server config */
// const CompressionPlugin = require('compression-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

/** Consider add
 * AggressiveSplittingPlugin
 * Compression Plugin
 * Reference: https://stackoverflow.com/questions/35054082/webpack-how-to-build-production-code-and-how-to-use-it
 */
module.exports = merge(baseConfig, {
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    /** In produciton, to prevent new vendor module are created
     * unnecessary due to chaning module id
     */
    new webpack.HashedModuleIdsPlugin(),
    /** CompressionPlugin requires server config
     * Config with Apache or Ngnix Server
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    */
  ],
});
