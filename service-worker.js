const CACHE_NAME = "alex-psicultor-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/manifest.json",

  "/core/storage.js",
  "/core/auth.js",
  "/core/excel.js",
  "/core/pdf.js",

  "/modules/tanques.js",
  "/modules/vendas.js",
  "/modules/relatorios.js",

  "/assets/icon-192.png",
  "/assets/icon-512.png"
];

// Instalação
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Ativação
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Interceptar requisições
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
