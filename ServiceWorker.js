const cacheName = "Geo Games-Polyloop-1.0";
const contentToCache = [
    "Build/graph-game.loader.js",
    "Build/7f438a3b3e2d69a8302a4a2c2f0e2e91.js.unityweb",
    "Build/5f6836a79d0116d2026dee12faaae271.data.unityweb",
    "Build/079e0f2e7a923056b8bc02a65f778eff.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
