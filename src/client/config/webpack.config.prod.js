const webpack = require('webpack');
/** CompressionPlugin require server config */
// const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
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
    /** Tree Shaking
     * https://webpack.js.org/guides/tree-shaking/
     * Minify the js file
     * Remove the dead codes
    */
    new UglifyJSPlugin({
      cache: true,
      parallel: true,
      uglifyOptions: {
        ie8: false,
        ecma: 8,
        compress: true,
        warnings: false,
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
