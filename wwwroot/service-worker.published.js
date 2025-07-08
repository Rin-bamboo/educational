// wwwroot/service-worker.published.js

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open('blazor-cache').then(cache => {
            return cache.match(event.request).then(response => {
                return response || fetch(event.request).then(fetchResponse => {
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        })
    );
});
