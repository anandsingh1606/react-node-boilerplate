const urlParams = new URLSearchParams(self.location.search);
const cacheName = urlParams.get("cache_version");
const env = urlParams.get("env");

const fetchAndCache = (e) => {
  return fetch(e.request).then((res) => {
    const resClone = res.clone();
    caches
      .open(cacheName)
      .then((cache) => {
        cache.put(e.request, resClone).catch((e) => {
          console.log("SW fetch error:", e);
        });
      })
      .catch((e) => {
        console.log("SW fetch error:", e);
      });
    return res;
  });
};

self.addEventListener("install", () => {
  return self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
          return Promise.resolve();
        })
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  if (
    e.request.destination
    && ["script", "image", "style", "manifest", "document"].includes(e.request.destination)
    && env === "production"
  ) {
    e.respondWith(
      caches.open(cacheName).then((cache) => {
        return cache.match(e.request).then((response) => {
          return response || fetchAndCache(e);
        });
      })
    );
    return;
  }
  e.respondWith(
    fetchAndCache(e).catch(() => {
      return caches.match(e.request).then((res) => {
        return res;
      });
    })
  );
});
