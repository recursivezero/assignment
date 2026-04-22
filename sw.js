/**
 * RailTrack PWA — Service Worker
 * Handles: offline caching, background sync, push notifications
 */

const CACHE_NAME   = 'railtrack-v1.0';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Space+Mono:wght@400;700&family=Noto+Sans:wght@300;400;500&display=swap',
];

// ── INSTALL: Pre-cache static assets ──────────────────────────────────────
self.addEventListener('install', event => {
  console.log('[SW] Installing RailTrack Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Pre-caching static assets');
      return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { cache: 'reload' })));
    }).catch(err => console.warn('[SW] Pre-cache error (non-fatal):', err))
  );
  self.skipWaiting();
});

// ── ACTIVATE: Clean old caches ────────────────────────────────────────────
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => {
        console.log('[SW] Deleting old cache:', k);
        return caches.delete(k);
      }))
    )
  );
  self.clients.claim();
});

// ── FETCH: Network-first with fallback to cache ───────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // Skip non-http requests (chrome-extension, data:, etc.)
  if (!request.url.startsWith('http')) return;

  // Skip API calls — always attempt fresh (but handle gracefully)
  const isAPICall = request.url.includes('rapidapi') || request.url.includes('railwayapi');
  if (isAPICall) {
    event.respondWith(networkWithFallback(request));
    return;
  }

  // For page/static assets: Cache-first with network update
  event.respondWith(cacheFirstWithUpdate(request));
});

/** Cache-first: serve from cache if available, else fetch & cache */
async function cacheFirstWithUpdate(request) {
  const cached = await caches.match(request);
  const fetchPromise = fetch(request)
    .then(response => {
      if (response && response.status === 200) {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
      }
      return response;
    })
    .catch(() => null);

  return cached || (await fetchPromise) || offlineFallback();
}

/** Network-first: try live, fall back to cache */
async function networkWithFallback(request) {
  try {
    const response = await fetch(request);
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || offlineFallback();
  }
}

/** Minimal offline fallback response */
function offlineFallback() {
  return new Response(
    JSON.stringify({ error: 'offline', message: 'No internet connection. Please try again later.' }),
    { status: 503, headers: { 'Content-Type': 'application/json' } }
  );
}

// ── PUSH NOTIFICATIONS ────────────────────────────────────────────────────
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title   = data.title   || '🚂 RailTrack Alert';
  const options = {
    body:    data.body    || 'You have a Tatkal booking reminder!',
    icon:    data.icon    || './icon-192.png',
    badge:   data.badge   || './icon-192.png',
    vibrate: [200, 100, 200, 100, 400],
    tag:     data.tag     || 'railtrack-' + Date.now(),
    actions: [
      { action: 'open',    title: '📋 Open App' },
      { action: 'dismiss', title: '✕ Dismiss'  },
    ],
    data: { url: data.url || './' }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// ── NOTIFICATION CLICK ────────────────────────────────────────────────────
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  const url = event.notification.data?.url || './';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      const existing = windowClients.find(c => c.url.includes('index.html') || c.url.endsWith('/'));
      if (existing) return existing.focus();
      return clients.openWindow(url);
    })
  );
});

// ── BACKGROUND SYNC ───────────────────────────────────────────────────────
self.addEventListener('sync', event => {
  if (event.tag === 'sync-pnr') {
    event.waitUntil(syncPNRStatus());
  }
});

async function syncPNRStatus() {
  console.log('[SW] Background sync: refreshing PNR status');
  // In production: read PNR from IndexedDB, re-fetch, store result back
  // This fires when connectivity is restored after offline period
}
