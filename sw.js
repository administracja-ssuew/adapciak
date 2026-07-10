const CACHE = 'adapciak-v6';
const STATIC = [
  './',
  './index.html',
  './images/hero.jpg',
  './images/galeria/1.jpg',
  './images/galeria/2.jpg',
  './images/galeria/3.jpg',
  './images/galeria/4.jpg',
  './images/koza_1.png',
  './images/koza_2.png',
  './images/koza_3.png',
  './images/koza_4.png',
  './ADAPCIAK_LOGO.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(STATIC))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (!e.request.url.startsWith(self.location.origin) &&
      !e.request.url.includes('fonts.googleapis') &&
      !e.request.url.includes('fonts.gstatic')) return;

  /* tailwind.css: network-first — po każdym rebuildzie CSS ma być świeży (cache tylko jako fallback offline) */
  if (e.request.url.includes('/tailwind.css')) {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res && res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  /* HTML / nawigacja: network-first, aby zmiany na stronie były widoczne od razu */
  const isHTML = e.request.mode === 'navigate' ||
                 e.request.destination === 'document' ||
                 e.request.url.endsWith('/') ||
                 e.request.url.endsWith('index.html');

  if (isHTML) {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res && res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put('./index.html', clone));
        }
        return res;
      }).catch(() => caches.match('./index.html') || caches.match('./'))
    );
    return;
  }

  /* Pozostałe zasoby (obrazy, font, logo): cache-first, network fallback */
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});

/* Push notifications */
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(
    self.registration.showNotification(data.title || 'Adapciak 2026', {
      body: data.body || 'Masz nową wiadomość od organizatorów!',
      icon: './ADAPCIAK_LOGO.png',
      badge: './ADAPCIAK_LOGO.png',
      tag: 'adapciak',
      data: { url: data.url || './' }
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data.url || './'));
});
