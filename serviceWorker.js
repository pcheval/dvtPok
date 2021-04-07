const staticDevPok = 'dev-pok-site-v1';
const assets = ['/', '/index.html', '/css/style.css', '/js/app.js'];

self.addEventListener('install', (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticDevPok).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', function (event) {
  if (!(event.request.url.indexOf('http') === 0)) return;

  event.respondWith(
    caches.match(event.request).then(function (cacheRes) {
      if (cacheRes) {
        return cacheRes;
      }

      return fetch(event.request).then(function (response) {
        const responseToCache = response.clone();

        caches.open(staticDevPok).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});



self.addEventListener('push', (pushEvent) => {
  pushEvent.waitUntil(
    self.registration.showNotification("Application > Service worker > btn Push")
  )
});

self.addEventListener('notificationclick', (event) => {
  console.log('👷', 'notificationclick', event);
  const {notification, action} = event;
});


self.addEventListener('notificationclose', (event) => {
  console.log('notificationclose OK');
  const {notification, action} = event;
});

