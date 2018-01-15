/* eslint-disable */
importScripts('https://unpkg.com/workbox-sw@2.1.2/build/importScripts/workbox-sw.prod.v2.1.2.js');

/**
 * Create an instance of WorkboxSW.0
 * 1. Setting skipWaiting to be true forces the waiting service worker.
 * to become the active service worker.
 *
 * 2. Setting clientsClaims to true tells our service worker to take control as
 * soon as it's activated.
 */
const workboxSW = new self.WorkboxSW({
  skipWaiting: true,
  clientsClaim: true,
});

/** Below is the custom Service Worker */

/** Cache Google Fonts CDN if any */
workboxSW.router.registerRoute(
/.*(?:fonts\.googleapis)\.com.*$/,
workboxSW.strategies.staleWhileRevalidate({
  cacheName: 'google-fonts',
  cacheExpiration: {
    maxEntries: 3,
    maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
  }
}));

/** Important: At build-time, workboxSW injects the list of files to cache into the array. */
workboxSW.precache([]);
