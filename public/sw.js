const CACHE_NAME = "toolbox-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/offline.html",
        "/icon-192.png",
        "/font/vazirmatn/Vazirmatn-Regular.ttf",
        "/font/vazirmatn/Vazirmatn-Black.ttf",
      ]);
    }),
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode !== "navigate") {
    return;
  }

  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match("/offline.html");
    }),
  );
});
