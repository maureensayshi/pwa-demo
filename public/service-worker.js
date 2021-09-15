const CACHE_NAME = 'my-site-cache-v1';
const assetsToCache = [
  // '/logo192.png',
  // 以下是 offline mode 的範例
  // '/',
  // '/static/js/bundle.js',
  // '/static/js/vendors~main.chunk.js',
  // '/static/js/main.chunk.js',
  // '/manifest.json',
  // '/favicon.ico',
]

self.addEventListener('install', function(event) {
  // self.skipWaiting(); 

  // event.waitUntil(
  //   caches.open(CACHE_NAME)
  //     .then(function(cache) {
  //       console.log('add cache');
  //       return cache.addAll(assetsToCache);
  //     })
  // );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // get response from Cache
          if (response) {
            console.log('*** response from service-worker(cache) ***', response?.url);
            return response;
          }
  
          // IMPORTANT: Clone the request. A request is a stream and
          // can only be consumed once. Since we are consuming this
          // once by cache and once by the browser for fetch, we need
          // to clone the response.
          const fetchRequest = event.request.clone();
  
          return fetch(fetchRequest).then(
            function(response) {
              console.log('---- response from server ----', response?.url);
              return response;
            }
          ).catch(function(error) {
            return new Response("<h1>Sorry, you're offline :-(</h1>", {
              headers: {'Content-Type': 'text/html'}
            })
          });
        })
      );
  });