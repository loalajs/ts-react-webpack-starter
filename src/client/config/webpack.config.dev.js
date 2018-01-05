const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

/** ENV */
const {
  PROTOCOL, HOST, PORT,
} = require('./env');

/** Paths */
const {
  CLIENT_DIST_PATH,
} = require('./path');


module.exports = merge(baseConfig, {
  devtool: 'cheap-module-source-map',
  devServer: {
    host: HOST,
    port: PORT,
    https: PROTOCOL === 'https',
    contentBase: CLIENT_DIST_PATH,
    stats: 'normal',
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
});
