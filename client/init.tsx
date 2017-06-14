/// <reference path="../node_modules/offline-plugin/offline-plugin.d.ts" />

import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install({
  onInstalled: () => OfflinePluginRuntime.applyUpdate()
});

let scripts = [ '/client/bundle.js' ];

let newBrowser = (
  'fetch' in window &&
  'Promise' in window &&
  'assign' in Object &&
  'keys' in Object
);

if (!newBrowser) {
  scripts.unshift('/client/polyfills.js');
}

scripts.forEach((src) => {
  const scriptEl = document.createElement('script');
  scriptEl.src = src;
  scriptEl.async = false;
  document.head.appendChild(scriptEl);
});

if (`serviceWorker` in navigator) {
  (navigator as any).serviceWorker.register('/sw.js', { scope: '/' })
    .catch((error) => console.warn('service worker registration failed with ' + error));
} else {
  console.warn('service worker API not available. poor you.');
}
