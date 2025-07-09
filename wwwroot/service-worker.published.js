// In development, always fetch from the network and do not cache.
self.importScripts('./service-worker-assets.js');
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

const cacheName = 'offline-cache-' + self.assetsManifest.version;
const assetsToCache = self.assetsManifest.assets
    .filter(asset => !asset.url.endsWith('.br') && !asset.url.endsWith('.gz'))
    .map(asset => new URL(asset.url, self.location).toString());

assetsToCache.push('./');

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll(assetsToCache))
    );
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request, { ignoreSearch: true })
            .then(response => response || fetch(event.request))
    );
});
