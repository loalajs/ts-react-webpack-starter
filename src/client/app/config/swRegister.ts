/** Service worker register
 * 1. Check if browser support service worker
 * 2. Disable Service Worker if page is currently served as CDN
 * 3. Check if page is currently serving on local
 * 3.1 If in localhost, check is sw file can be found, if it is, register as normal
 * 3.2 If in localhost, if sw file cannot be found,
 * the current localhost:port might be running other app, unregsiter sw and refresh
 * 4. If not on localhost, just go and register
 *
 */
function swRegister() {
  if ('serviceWorker' in navigator) {
    /** Our service worker won't work if APP_PUBLIC_URL is on a different origin
     * from what our page is served on. This might happen if a CDN is used to
     * serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374 */
    const publicUrl = new URL(process.env.APP_PUBLIC_URL, String(window.location));
    if (publicUrl.origin !== window.location.origin) {
      console.log(`publicUrl !== window.location.origin; the site nay serve CDN`);
      return;
    }

    // Register service worker after browser has loaded the resources
    const swUrl = `${publicUrl}sw.js`;

    // Check if page is currently serving on local device
    if (isLocalhost) {
      // This is running on localhost. Lets check if a service worker still exists or not.
      checkValidServiceWorker(swUrl);
    } else {
      // Is not local host. Just register service worker
      registerValidSW(swUrl);
    }
  }
}

/** Check if the hostname is local host */
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
    ),
);

/** Register service worker */
function registerValidSW(swUrl: string) {
  navigator.serviceWorker.register(swUrl)
  .then((registration) => {
    console.log(
      'Service Worker registration successful with scope: ',
      registration.scope);
  })
  .catch((err) => {
    console.log('Service Worker registration failed: ', err);
  });
}

/** Check if service worker can be found
 * If found, register service worker as normal
 * If not found, probably localhost:3001 is used by another app
 */
function checkValidServiceWorker(swUrl: string) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then((response) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      if (
        response.status === 404 ||
        response.headers.get('content-type').indexOf('javascript') === -1
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.',
      );
    });
}

export default swRegister;
