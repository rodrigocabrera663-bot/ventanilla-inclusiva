// pwa.js — registra el service worker (offline + instalable como app).
// Si el navegador no lo soporta, la app sigue funcionando online sin problema.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => { /* opcional */ });
  });
}
