self.addEventListener('install', e => {
  e.waitUntil(caches.open('app-shell-v1').then(c => c.addAll(['/', '/tw.css'])))
})
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url)
  if (e.request.method !== 'GET') return
  if (url.pathname.startsWith('/api/')) {
    e.respondWith(fetch(e.request))
    return
  }
  e.respondWith(
    caches.match(e.request).then(
      resp =>
        resp ||
        fetch(e.request).then(r => {
          const copy = r.clone()
          caches.open('dynamic-v1').then(c => c.put(e.request, copy))
          return r
        })
    )
  )
})
