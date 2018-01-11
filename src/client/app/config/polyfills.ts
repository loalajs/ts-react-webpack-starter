/** Polyfills
 * es6-promise polyfill provide Promise usage for IE browser
 * Reference: https://github.com/stefanpenner/es6-promise#auto-polyfill
 */
function importPromisePolyfill() {
  if (typeof Promise !== 'undefined' && Promise.toString().indexOf('[native code]') !== -1) {
    return;
  }
  // tslint:disable-next-line:space-in-parens
  import(/* webpackChunkName: "es6-promise-polyfill" */'es6-promise');
}

export {
  importPromisePolyfill,
};
