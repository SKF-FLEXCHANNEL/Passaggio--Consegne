const CACHE='consegne-hmi-v1';
const ASSETS=['./','index.html','style.css','app.js','manifest.json','img/zona1.jpg','img/zona2.jpg','img/zona3.jpg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
