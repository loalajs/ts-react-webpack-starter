const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

/** ENV */
const {
  APP_PROTOCOL, APP_HOST, APP_PORT,
} = require('./env');

/** Paths */
const {
  DIST,
} = require('./path');


module.exports = merge(baseConfig, {
  watch: true,
  devtool: 'source-map',
  devServer: {
    host: APP_HOST,
    port: APP_PORT,
    https: APP_PROTOCOL === 'https',
    contentBase: DIST,
    stats: 'normal',
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
});
