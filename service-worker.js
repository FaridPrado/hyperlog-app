const CACHE="hyperlog-pwa-v1.0.0";
const CORE=["./","./index.html","./manifest.webmanifest","./icons/icon-1-0-192.png","./icons/icon-1-0-512.png","./icons/icon-1-0-maskable-512.png","./icons/logo-1-0-512.png"];
self.addEventListener("install",event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    for(const url of CORE){try{const res=await fetch(new Request(url,{cache:"reload"}));if(res?.ok)await cache.put(url,res.clone())}catch(e){}}
    await self.skipWaiting();
  })());
});
self.addEventListener("activate",event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener("fetch",event=>{
  const req=event.request;if(req.method!=="GET")return;
  const url=new URL(req.url);if(url.origin!==self.location.origin)return;
  if(req.mode==="navigate"){
    event.respondWith((async()=>{
      try{
        const res=await fetch(new Request(req,{cache:"no-store"}));
        if(res?.ok){const c=await caches.open(CACHE);await c.put("./index.html",res.clone())}
        return res;
      }catch(e){return (await caches.match("./index.html"))||(await caches.match("./"))}
    })());
    return;
  }
  event.respondWith((async()=>{
    try{
      const res=await fetch(new Request(req,{cache:"no-cache"}));
      if(res?.ok){const c=await caches.open(CACHE);await c.put(req,res.clone());return res}
    }catch(e){}
    return (await caches.match(req))||Response.error();
  })());
});
