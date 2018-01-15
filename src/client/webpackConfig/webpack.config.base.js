const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WorkboxPlugin = require('workbox-webpack-plugin');
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
  SRC,
  DIST,
} = require('./path');

/** Webpack config start here */
const config = {
  entry: path.resolve(SRC, 'main.tsx'),
  output: {
    path: DIST,
    filename: '[name].bundle-[hash:8].js',
    /** chuckFilename is for code splitting chunk that is lazy loading */
    chunkFilename: '[name].chunk-[hash:8].js',
  },
  resolve: {
    /** Must include .js, .jsx for react to resolve after ts-loader */
    extensions: ['.ts', '.tsx', '.jsx', '.js', '.json', '.css', '.scss'],
    alias: {},
    modules: [
      SRC,
      'node_modules',
    ],
  },
  module: {
    rules: [
      /** Detect .critical.css/.scss for inline critical css */
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
          name: 'static/media/[name]-[hash:8].[ext]',
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
  /** Some plugins could've been placed in prod config.
   * However, to reduce the potential difference between
   * dev and prod, i believe it is better to have more sync plugins
   * so it is less likely to have surprice when building the prod.
   */
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(SRC, 'index.html'),
      minify: {
        collapseWhitespace: IS_PROD,
        collapseInlineTagWhitespace: IS_PROD,
        removeComments: IS_PROD,
        removeRedundantAttributes: IS_PROD,
      },
      inject: true,
    }),
    /** ScriptExtHtmlWebpackPlugin must be after HtmlWebpackPlugin  */
    new ScriptExtHtmlWebpackPlugin({
      sync: /critical/,
      defaultAttribute: 'defer',
    }),
    criticalCSS,
    externalCSS,
    /** Inline critical css file with name .critical.css / .scss
     * Warning: If there is no .critical.css / .scss
     * It will yeild error as StyleExtHtmlWebpackPlugin is not able to
     * find it from ExtractTextPlugin
     */
    new StyleExtHtmlWebpackPlugin({
      file: criticalCssFilename,
      minify: IS_PROD,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 2,
      filename: '[name].bundle-[hash:8].js',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2,
      minSize: 1024,
      filename: '[name].bundle-[hash:8].js',
    }),
    new webpack.DefinePlugin({
      'process.env.APP_PROTOCOL': JSON.stringify(APP_PROTOCOL),
      'process.env.APP_HOST': JSON.stringify(APP_HOST),
      'process.env.APP_PORT': JSON.stringify(APP_PORT),
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      /** Preload the array of the named chunks
       * Chunks that are critical for first paint
       * should be preloaded. Examples can be:
       * 1. Fonts
       * 2. Hero img
       * 3. Other resources that are critically needed
       * Notice: if everything is high priority then nothing is
       * Notice: This plugin requires further customisation
       */
      include: ['main'],
      as(entry) {
        if (/\.css$/.test(entry)) return 'style';
        if (/\.woff$/.test(entry)) return 'font';
        if (/\.png$/.test(entry)) return 'image';
        return 'script';
      },
      fileBlacklist: [/\.map/, /critical\.css/],
    }),
    /** Prefetch chunk for navigation purpose
     * as they deserved lower priority than preload chunk
     * Notice: Add other route chunk later for better performance
     * Notice: Only fetch / load what people may need to save user's network data
     */
    new PreloadWebpackPlugin({
      rel: 'prefetch',
      /** Preload the array of the named chunks */
      include: ['route-about'],
      as: 'script',
      fileBlacklist: [/\.map/, /critical\.css/],
    }),
    /**
     * Moment.js is an extremely popular library that bundles large locale files
     * by default due to how Webpack interprets its code. This is a practical
     * solution that requires the user to opt into importing specific locales.
     * https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
     * You can remove this if you do not use moment
     */
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new BundleAnalyzerPlugin({
      generateStatsFile: true,
    }),
    /** WorkboxPlugin inspects the contents of dist and generates service worker code
     * for caching the output. Since Workbox revisions each file based on its contents,
     * Workbox should always be the last plugin you call. */
    new WorkboxPlugin({
      globDirectory: DIST,
      globPatterns: ['**/*.{html,js,css}'],
      swDest: path.join(DIST, 'sw.js'),
      swSrc: path.join(SRC, 'sw.js'),
      /** Runtime cache:
       * 1. Replace api url in urlPattern
       * 2. Check https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/ for caching strategies.
      runtimeCaching: [
        {
          urlPattern: new RegExp('https://www.pais.com/api'),
          handler: 'staleWhileRevalidate',
        },
      ],
      */
    }),
  ],
};

module.exports = config;
