const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CLIENT_SRC_PATH = path.join(__dirname, 'src', 'client');
const CLIENT_DIST_PATH = path.join(__dirname, 'dist', 'client');
const { NODE_ENV } = process.env;
const IS_DEV = NODE_ENV === 'development';

const config = {
  entry: path.resolve(CLIENT_SRC_PATH, 'main.tsx'),
  output: {
    path: path.resolve(CLIENT_DIST_PATH),
    filename: '[name]-[hash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.json', '.css', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          }],
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
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: IS_DEV ? 'eval-cheap-source-map' : 'source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3001,
    contentBase: CLIENT_DIST_PATH,
    stats: 'normal',
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(CLIENT_SRC_PATH, 'index.html'),
    }),
    new ExtractTextPlugin({
      filename: '[name]-[contenthash].css',
      disable: IS_DEV,
    }),
  ],
};

module.exports = config;
