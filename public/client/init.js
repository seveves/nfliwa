!function(e){function r(i){if(n[i])return n[i].exports;var o=n[i]={exports:{},id:i,loaded:!1};return e[i].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}var n={};return r.m=e,r.c=n,r.p="/client/",r(0)}({0:function(e,r,n){e.exports=n(36)},36:function(e,r){var n=["/client/bundle.js"],i="fetch"in window&&"Promise"in window&&"assign"in Object&&"keys"in Object;i||n.unshift("/client/polyfills.js"),n.forEach(function(e){var r=document.createElement("script");r.src=e,r.async=!1,document.head.appendChild(r)}),"serviceWorker"in navigator?navigator.serviceWorker.register("/sw.js",{scope:"/client"}).catch(function(e){return console.warn("service worker registration failed with "+e)}):console.warn("service worker API not available. poor you.")}});
//# sourceMappingURL=init.js.map