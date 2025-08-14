const CACHE_NAME = 'kezilabda-dual-pro-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-1024.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => {
      if(k !== CACHE_NAME) return caches.delete(k);
    })))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request).then(networkRes => {
        // Optionally cache new requests
        return networkRes;
      });
    })
  );
});