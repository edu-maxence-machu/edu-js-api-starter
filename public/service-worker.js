'use strict';

// A chaque fois qu'un fichier dans "FILES_TO_CACHE" est mis à jour
const CACHE_NAME = 'static-cache-v1';
const DATA_CACHE_NAME = 'data-cache-v1';

// Ajoutez ici les fichiers de votre application à mettre en cache
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/img/close.svg',
  '/img/menu.svg',
  '/js/main.js',
  '/js/request.js',
  '/css/custom.css',
  '/css/main.css',
  '/css/normalize.css'
];

/*
=> Quand le Service Worker est installé
=> Télécharge tous les fichiers à mettre en cache
 */
self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  // Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

/*
=> Quand le Service Worker est activé
=> Supprime les éléments "périmés" en cache
 */
self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

/*
Ajoute un listener sur la méthode fetch
 */
self.addEventListener('fetch', (evt) => {

  console.log('Fetch intercepté par le SW', evt.request.url);

  if (evt.request.url.includes('/api.openaq.org/v1/')) {
    evt.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(evt.request)
          .then((response) => {
            // If the response was good, clone it and store it in the cache.
            if (response.status === 200) {
              cache.put(evt.request.url, response.clone());
            }
            return response;
          }).catch((err) => {
            // Network request failed, try to get it from the cache.
            return cache.match(evt.request);
          });
      }));
    return;
  }
  evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request)
        .then((response) => {
          return response || fetch(evt.request);
        });
    })
  );
});
