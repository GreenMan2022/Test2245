const CACHE_NAME = 'rpg-pwa-v1';
const urlsToCache = [
  '/Test2245/',
  '/Test2245/index.html',
  '/Test2245/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.map(key => key !== CACHE_NAME && caches.delete(key))
  )));
  self.clients.claim();
});
