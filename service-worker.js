importScripts("/screening-timer/precache-manifest.c9234a0cd94329ee48172ec525ffaeca.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

// If you are using 'GenerateSW' (default) for your workboxPluginMode setting this file is auto generated for you.
// If you are using 'InjectManifest' then add this to your custom SW after your standard workbox config

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting()
    }
})


workbox.core.clientsClaim(); // Vue CLI 4 and Workbox v4, else

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

