// service-worker.published.js
self.assetsManifest = {
    "assets": [
        // ここは service-worker-assets.js から読み込まれます
    ],
    "version": "v1"
};

const cacheName = 'blazor-cache-v1';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return fetch('service-worker-assets.js')
                .then(response => response.json())
                .then(assetsManifest => {
                    const assetsToCache = assetsManifest.assets
                        .filter(asset => !asset.url.endsWith('.br') && !asset.url.endsWith('.gz'))
                        .map(asset => asset.url);

                    assetsToCache.push('/'); // index.html もキャッシュ
                    return cache.addAll(assetsToCache);
                });
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
