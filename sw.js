// sw.js — service worker: cachea el "app shell" para que funcione SIN INTERNET.
const CACHE = 'ventanilla-inclusiva-v1';
const ASSETS = [
  'index.html', 'solicitud.html', 'consultar.html', 'casillero.html', 'login.html',
  'comparativa.html',
  'css/styles.css',
  'js/i18n.js', 'js/validacion.js', 'js/store.js', 'js/asistente.js', 'js/voz.js',
  'js/modo-voz.js', 'js/consultar.js', 'js/preferencias.js', 'js/auth.js',
  'js/login.js', 'js/casillero.js', 'js/pwa.js',
  'data/tramites.json', 'manifest.webmanifest', 'icon.svg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache-first con respaldo a la red; si todo falla, devuelve el inicio.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((hit) =>
      hit || fetch(e.request).then((resp) => {
        const copia = resp.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copia)).catch(() => {});
        return resp;
      }).catch(() => caches.match('index.html'))
    )
  );
});
