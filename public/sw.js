self.addEventListener("activate", () => {
  console.log("Service Worker activating.");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
