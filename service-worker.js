const CACHE="hyperlog-pwa-v1.0.0-prod1";
const APP_SHELL=[
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-1-0-192.png",
  "./icons/icon-1-0-512.png",
  "./icons/icon-1-0-maskable-512.png",
  "./icons/logo-1-0-512.png"
];

self.addEventListener("install",event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    await Promise.all(APP_SHELL.map(async url=>{
      try{
        const response=await fetch(new Request(url,{cache:"reload"}));
        if(response.ok)await cache.put(url,response.clone());
      }catch(_){ }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate",event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key.startsWith("hyperlog-pwa-")&&key!==CACHE).map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("message",event=>{
  if(event.data==="SKIP_WAITING")self.skipWaiting();
});

self.addEventListener("fetch",event=>{
  const request=event.request;
  if(request.method!=="GET")return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;

  if(request.mode==="navigate"){
    event.respondWith((async()=>{
      try{
        const response=await fetch(new Request(request,{cache:"no-store"}));
        if(response.ok){
          const cache=await caches.open(CACHE);
          await cache.put("./index.html",response.clone());
        }
        return response;
      }catch(_){
        return (await caches.match("./index.html"))||(await caches.match("./"))||Response.error();
      }
    })());
    return;
  }

  event.respondWith((async()=>{
    const cached=await caches.match(request);
    if(cached){
      event.waitUntil((async()=>{
        try{
          const fresh=await fetch(new Request(request,{cache:"no-cache"}));
          if(fresh.ok){
            const cache=await caches.open(CACHE);
            await cache.put(request,fresh.clone());
          }
        }catch(_){ }
      })());
      return cached;
    }
    try{
      const response=await fetch(new Request(request,{cache:"no-cache"}));
      if(response.ok){
        const cache=await caches.open(CACHE);
        await cache.put(request,response.clone());
      }
      return response;
    }catch(_){
      return Response.error();
    }
  })());
});
