// service worker globals
var SERVICE_WORKER_VERSION = 'v2';
var CACHE_RESOURCES = [
        '/client',
        '/client/index.html',
        '/client/bundle.js',
        '/client/init.js',
        '/client/style.css',
        '/client/img/nf-logo.png',
        '/client/api/static',
        '/client/api/posts',
        '/client/api/posts?a=6&p=0',
        '/client/api/events/next',
        '/client/api/events/last',
        '/client/api/events/location',
        '/client/api/static/ueber-uns',
        '/client/api/static/gruppen'
      ];

// service worker installation
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(SERVICE_WORKER_VERSION).then(function(cache) {
      return cache.addAll(CACHE_RESOURCES);
    })
  );
});

// service worker fetching resources
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fromCache(event.request).catch(reason =>
    fromNetwork(event.request, 1000)));

  event.waitUntil(update(event.request));
});

function fromCache(request) {
  return caches
    .open(SERVICE_WORKER_VERSION)
    .then(cache => cache.match(request))
    .then(matching => matching || Promise.reject('no-match'));
}

function fromNetwork(request) {
  return new Promise(function (fulfill, reject) {
    fetch(request).then(function (response) {
      fulfill(response);
    }, reject);
  });
}

function update(request) {
  return caches.open(SERVICE_WORKER_VERSION).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response.clone()).then(function () {
        return response;
      });
    }, function (reason) {
      throw new Error(reason);
    });
  });
}
