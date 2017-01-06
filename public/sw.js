// service worker globals
var SERVICE_WORKER_VERSION = 'v1';
var CACHE_RESOURCES = [
        '/img/nf-logo.png',
        '/client/index.html',
        '/client/bundle.js',
        '/client/style.css',
        '/api/static',
        '/api/posts',
        '/api/events/next',
        '/api/events/last',
        '/api/events/location',
        '/api/static/ueber-uns',
        '/api/static/gruppen'
      ];

// service worker installation
self.addEventListener('install', function(event) {
  console.log('service worker ' + SERVICE_WORKER_VERSION + ' is being installed.');
  event.waitUntil(
    caches.open(SERVICE_WORKER_VERSION).then(function(cache) {
      console.log('service worker adds following resources to the cache.', CACHE_RESOURCES);
      return cache.addAll(CACHE_RESOURCES);
    })
  );
});

// service worker fetching resources
self.addEventListener('fetch', function(event) {
  console.log('service worker is fetching the resource for ', event.request.url);
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
