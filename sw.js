const C='kaito-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
// 항상 네트워크 우선(새 버전이 바로 반영), 오프라인일 때만 저장본 사용
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{
    if(r.ok&&new URL(e.request.url).origin===location.origin){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));}
    return r;
  }).catch(()=>caches.match(e.request).then(m=>m||caches.match('./'))));
});
