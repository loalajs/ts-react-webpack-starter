const externalCssFilename = 'static/styles/[name].bundle-[contenthash:8].css';
const criticalCssFilename = 'critical.css';

const { POSTCSS_CONFIG_PATH } = require('./path');

const cssConfig = {
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
};


module.exports = {
  criticalCssFilename,
  externalCssFilename,
  cssConfig,
};
