// Combined Service Worker for PWA + OneSignal
// This handles both PWA caching and OneSignal push notifications

// Import OneSignal functionality first
importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js');

// Import Workbox for PWA functionality
importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');

// Initialize Workbox
if (workbox) {
  // Set up precaching (this will be injected by Vite PWA)
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);
  
  // Clean up outdated caches
  workbox.precaching.cleanupOutdatedCaches();

  // Runtime caching strategies
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
        {
          cacheKeyWillBeUsed: async ({ request }) => {
            return `${request.url}?v=${Date.now()}`;
          },
        },
      ],
    })
  );

  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'script' || request.destination === 'style',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-resources',
    })
  );

  workbox.routing.registerRoute(
    ({ url }) => url.pathname.startsWith('/api/'),
    new workbox.strategies.NetworkFirst({
      cacheName: 'api-cache',
      networkTimeoutSeconds: 3,
    })
  );
}

// OneSignal event handling
self.addEventListener('push', event => {
  console.log('Push notification received in combined SW');
  // OneSignal handles this automatically through the imported script
});

self.addEventListener('notificationclick', event => {
  console.log('Notification clicked in combined SW');
  event.notification.close();
  
  // OneSignal handles this automatically, but we can add custom logic
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      // If a window is already open, focus it
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === self.registration.scope && 'focus' in client) {
          return client.focus();
        }
      }
      // If no window is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    console.log('Background sync triggered');
    // Handle background sync for offline actions
  }
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/api/")) return; 
  if (event.request.mode === "navigate") {
    event.respondWith(
      caches.match("/index.html").then((resp) => resp || fetch("/index.html"))
    );
  }
});


console.log('Combined PWA + OneSignal Service Worker loaded successfully');
