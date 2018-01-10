const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { cssConfig, criticalCssFilename, externalCssFilename } = require('./cssLoader');

/** ENV */
const {
  APP_PROTOCOL, APP_HOST, APP_PORT, NODE_ENV,
} = require('./env');

const IS_PROD = NODE_ENV === 'production';

/** Css / Scss loader config for
 * 1. Critical css (Above the fold)
 * 2. Other css (Below the fold) */
const criticalCSS = new ExtractTextPlugin(criticalCssFilename);
const externalCSS = new ExtractTextPlugin(externalCssFilename);

/** Path */
const {
  ROOT_SRC_PATH,
  ROOT_DIST_PATH,
} = require('./path');

/** Webpack config start here */
const config = {
  entry: path.resolve(ROOT_SRC_PATH, 'main.tsx'),
  output: {
    path: ROOT_DIST_PATH,
    filename: '[name]-bundle-[hash:8].js',
  },
  resolve: {
    /** Must include .js, .jsx for react to resolve after ts-loader */
    extensions: ['.ts', '.tsx', '.jsx', '.js', '.json', '.css', '.scss'],
    alias: {},
    modules: [
      ROOT_SRC_PATH,
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.critical\.s?css$/,
        use: criticalCSS.extract(cssConfig),
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.s?css$/,
        use: externalCSS.extract(cssConfig),
        exclude: /(node_modules|bower_components)\/|\.critical\.scss$/,
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /(node_modules|bower_components)/,
      },
      /** Load Images */
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      /** Load fonts */
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'static/fonts/[name].[ext]',
        },
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(ROOT_SRC_PATH, 'index.html'),
      minify: {
        collapseWhitespace: IS_PROD,
        collapseInlineTagWhitespace: IS_PROD,
        removeComments: IS_PROD,
        removeRedundantAttributes: IS_PROD,
      },
      inject: true,
    }),
    criticalCSS,
    externalCSS,
    new StyleExtHtmlWebpackPlugin({
      file: criticalCssFilename,
      minify: IS_PROD,
    }),
    new webpack.DefinePlugin({
      'process.env.APP_PROTOCOL': JSON.stringify(APP_PROTOCOL),
      'process.env.APP_HOST': JSON.stringify(APP_HOST),
      'process.env.APP_PORT': JSON.stringify(APP_PORT),
    }),
    new BundleAnalyzerPlugin({
      generateStatsFile: true,
    }),
  ],
};

module.exports = config;
