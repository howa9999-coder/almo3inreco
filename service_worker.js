const cacheName = "app-cache-v3"; // Update version when you add/remove assets

const assets = [
  "index.html",
  "index.js",
  "manifest.json",
  "main.css",
  "main.js",
  "repeat192.png",
  "repeat.png",
  "microphone.png"
];

// const assets = ['/offline.html']

//TO INSTALL ALL FILES IN THE CACHE STORAGE
self.addEventListener('install', (installEvent) => {
  installEvent.waitUntil(
    caches.open(cacheName)
      .then((cache) => cache.addAll(assets))
      .catch((err) => console.log("error", err))
  );
  self.skipWaiting(); // Force activation
});

//TO DELETE ALL THE VERSION IN THE CACHE AND KEEP ONLY THE LAST ONE
self.addEventListener('activate', (activateEvent) => {
  activateEvent.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== cacheName) // Filter out the current cache
          .map((key) => caches.delete(key))   // Delete the old caches
      );
    })
  );
      // activateEvent.waitUntil(clients.claim()); // Take control of all clients

});


 self.addEventListener('fetch', (fetchEvent) => {
 console.log('Fetch event intercepted:', fetchEvent.request.url);
   fetchEvent.respondWith(
      caches.match(fetchEvent.request).then((res)=>{
          return res || fetch(fetchEvent.request);
      })
  ) 
}); 