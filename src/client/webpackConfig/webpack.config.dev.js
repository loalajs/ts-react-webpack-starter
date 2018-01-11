const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

/** ENV */
const {
  APP_PROTOCOL, APP_HOST, APP_PORT,
} = require('./env');

/** Paths */
const {
  ROOT_DIST_PATH,
} = require('./path');


module.exports = merge(baseConfig, {
  devtool: 'source-map',
  devServer: {
    host: APP_HOST,
    port: APP_PORT,
    https: APP_PROTOCOL === 'https',
    contentBase: ROOT_DIST_PATH,
    stats: 'normal',
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
});
