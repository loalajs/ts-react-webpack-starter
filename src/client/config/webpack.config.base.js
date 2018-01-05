const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/** ENV */
const {
  PROTOCOL, HOST, PORT,
} = require('./env');

/** Path */
const {
  CLIENT_SRC_PATH,
  CLIENT_DIST_PATH,
  POSTCSS_CONFIG_PATH,
} = require('./path');

/** Webpack config start here */
const config = {
  entry: path.resolve(CLIENT_SRC_PATH, 'main.tsx'),
  output: {
    path: CLIENT_DIST_PATH,
    filename: '[name]-bundle-[hash:8].js',
  },
  resolve: {
    /** Must include .js, .jsx for react to resolve after ts-loader */
    extensions: ['.ts', '.tsx', '.jsx', '.js', '.json', '.css', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 3,
              },
            },
            {
              /** If a previous loader like
               * e.g sass-loader is applied and it's sourceMap option is set,
               * but the sourceMap option in postcss-loader is omitted,
               * previous source maps will be discarded by postcss-loader entirely. */
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                config: {
                  path: POSTCSS_CONFIG_PATH,
                },
              },
            },
            {
              loader: 'resolve-url-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
          /**
           * Use style-loader in development
           * Usually, it's recommended to extract the style sheets into a dedicated file
           * in production using the ExtractTextPlugin.
           * This way your styles are not dependent on JavaScript:
           */
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      /** Load Images */
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      /** Load fonts */
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        exclude: /node_modules/,
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
      template: path.join(CLIENT_SRC_PATH, 'index.html'),
    }),
    new ExtractTextPlugin({
      filename: 'static/styles/[name]-bundle-[contenthash:8].css',
      disable: true,
    }),
    new webpack.DefinePlugin({
      'process.env.PROTOCOL': JSON.stringify(PROTOCOL),
      'process.env.HOST': JSON.stringify(HOST),
      'process.env.PORT': JSON.stringify(PORT),
    }),
  ],
};

module.exports = config;
