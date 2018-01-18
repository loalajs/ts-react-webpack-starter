/* eslint-disable */
importScripts('https://unpkg.com/workbox-sw@2.1.2/build/importScripts/workbox-sw.prod.v2.1.2.js');

/**
 * Create an instance of WorkboxSW.0
 * 1. Setting skipWaiting to be true forces the new waiting service worker
 * to become the active service worker (replace old service worker)
 *
 * 2. Setting clientsClaims to true tells our service worker
 *  to take control of other pages soon as it's activated.
 */
const workboxSW = new WorkboxSW({
  skipWaiting: true,
  clientsClaim: true,
});

/** Below is the custom Service Worker */

/** Cache: NetworkFirst - Home Page  */
workboxSW.router.registerRoute(
  '/',
  workboxSW.strategies.networkFirst({
  cacheName: 'home',
  cacheExpiration: {
    maxAgeSeconds: 86400
  }
})
);

/** Cache: StaleWhileRevalidate - Google fonts cdn if any */
workboxSW.router.registerRoute(
  /.*(?:fonts\.googleapis)\.com.*$/,
  workboxSW.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts',
    cacheExpiration: {
      maxEntries: 3,
      maxAgeSeconds: 60 * 60 * 24 * 10 // 10 Days
    }
  })
);

/** Cache: CacheFirst - images and local fonts */
workboxSW.router.registerRoute(
  /\.(png|svg|woff|ttf|eot)/,
  workboxSW.strategies.cacheFirst({
    cacheName: 'assets',
    cacheExpiration: {
      maxEntries: 20,
      maxAgeSeconds: 60 * 60 * 24 * 10 // 10 Days
    }
  })
);

/** Important: At build-time, workboxSW injects the list of files to cache into the array. */
workboxSW.precache([]);
