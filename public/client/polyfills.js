!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="/client",e(0)}({0:function(t,e,n){t.exports=n(38)},16:function(t,e){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(t){if(c===setTimeout)return setTimeout(t,0);if((c===n||!c)&&setTimeout)return c=setTimeout,setTimeout(t,0);try{return c(t,0)}catch(e){try{return c.call(null,t,0)}catch(e){return c.call(this,t,0)}}}function i(t){if(l===clearTimeout)return clearTimeout(t);if((l===r||!l)&&clearTimeout)return l=clearTimeout,clearTimeout(t);try{return l(t)}catch(e){try{return l.call(null,t)}catch(e){return l.call(this,t)}}}function s(){y&&h&&(y=!1,h.length?p=h.concat(p):m=-1,p.length&&a())}function a(){if(!y){var t=o(s);y=!0;for(var e=p.length;e;){for(h=p,p=[];++m<e;)h&&h[m].run();m=-1,e=p.length}h=null,y=!1,i(t)}}function u(t,e){this.fun=t,this.array=e}function f(){}var c,l,d=t.exports={};!function(){try{c="function"==typeof setTimeout?setTimeout:n}catch(t){c=n}try{l="function"==typeof clearTimeout?clearTimeout:r}catch(t){l=r}}();var h,p=[],y=!1,m=-1;d.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];p.push(new u(t,e)),1!==p.length||y||o(a)},u.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=f,d.addListener=f,d.once=f,d.off=f,d.removeListener=f,d.removeAllListeners=f,d.emit=f,d.binding=function(t){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(t){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},20:function(t,e,n){(function(e){!function(n){function r(){}function o(t,e){return function(){t.apply(e,arguments)}}function i(t){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],l(t,this)}function s(t,e){for(;3===t._state;)t=t._value;return 0===t._state?void t._deferreds.push(e):(t._handled=!0,void i._immediateFn(function(){var n=1===t._state?e.onFulfilled:e.onRejected;if(null===n)return void(1===t._state?a:u)(e.promise,t._value);var r;try{r=n(t._value)}catch(t){return void u(e.promise,t)}a(e.promise,r)}))}function a(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof i)return t._state=3,t._value=e,void f(t);if("function"==typeof n)return void l(o(n,e),t)}t._state=1,t._value=e,f(t)}catch(e){u(t,e)}}function u(t,e){t._state=2,t._value=e,f(t)}function f(t){2===t._state&&0===t._deferreds.length&&i._immediateFn(function(){t._handled||i._unhandledRejectionFn(t._value)});for(var e=0,n=t._deferreds.length;e<n;e++)s(t,t._deferreds[e]);t._deferreds=null}function c(t,e,n){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.promise=n}function l(t,e){var n=!1;try{t(function(t){n||(n=!0,a(e,t))},function(t){n||(n=!0,u(e,t))})}catch(t){if(n)return;n=!0,u(e,t)}}var d=setTimeout;i.prototype.catch=function(t){return this.then(null,t)},i.prototype.then=function(t,e){var n=new this.constructor(r);return s(this,new c(t,e,n)),n},i.all=function(t){var e=Array.prototype.slice.call(t);return new i(function(t,n){function r(i,s){try{if(s&&("object"==typeof s||"function"==typeof s)){var a=s.then;if("function"==typeof a)return void a.call(s,function(t){r(i,t)},n)}e[i]=s,0===--o&&t(e)}catch(t){n(t)}}if(0===e.length)return t([]);for(var o=e.length,i=0;i<e.length;i++)r(i,e[i])})},i.resolve=function(t){return t&&"object"==typeof t&&t.constructor===i?t:new i(function(e){e(t)})},i.reject=function(t){return new i(function(e,n){n(t)})},i.race=function(t){return new i(function(e,n){for(var r=0,o=t.length;r<o;r++)t[r].then(e,n)})},i._immediateFn="function"==typeof e&&function(t){e(t)}||function(t){d(t,0)},i._unhandledRejectionFn=function(t){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",t)},i._setImmediateFn=function(t){i._immediateFn=t},i._setUnhandledRejectionFn=function(t){i._unhandledRejectionFn=t},"undefined"!=typeof t&&t.exports?t.exports=i:n.Promise||(n.Promise=i)}(this)}).call(e,n(22).setImmediate)},21:function(t,e,n){(function(t,e){!function(t,n){"use strict";function r(t){"function"!=typeof t&&(t=new Function(""+t));for(var e=new Array(arguments.length-1),n=0;n<e.length;n++)e[n]=arguments[n+1];var r={callback:t,args:e};return y[p]=r,h(p),p++}function o(t){delete y[t]}function i(t){var e=t.callback,r=t.args;switch(r.length){case 0:e();break;case 1:e(r[0]);break;case 2:e(r[0],r[1]);break;case 3:e(r[0],r[1],r[2]);break;default:e.apply(n,r)}}function s(t){if(m)setTimeout(s,0,t);else{var e=y[t];if(e){m=!0;try{i(e)}finally{o(t),m=!1}}}}function a(){h=function(t){e.nextTick(function(){s(t)})}}function u(){if(t.postMessage&&!t.importScripts){var e=!0,n=t.onmessage;return t.onmessage=function(){e=!1},t.postMessage("","*"),t.onmessage=n,e}}function f(){var e="setImmediate$"+Math.random()+"$",n=function(n){n.source===t&&"string"==typeof n.data&&0===n.data.indexOf(e)&&s(+n.data.slice(e.length))};t.addEventListener?t.addEventListener("message",n,!1):t.attachEvent("onmessage",n),h=function(n){t.postMessage(e+n,"*")}}function c(){var t=new MessageChannel;t.port1.onmessage=function(t){var e=t.data;s(e)},h=function(e){t.port2.postMessage(e)}}function l(){var t=b.documentElement;h=function(e){var n=b.createElement("script");n.onreadystatechange=function(){s(e),n.onreadystatechange=null,t.removeChild(n),n=null},t.appendChild(n)}}function d(){h=function(t){setTimeout(s,0,t)}}if(!t.setImmediate){var h,p=1,y={},m=!1,b=t.document,v=Object.getPrototypeOf&&Object.getPrototypeOf(t);v=v&&v.setTimeout?v:t,"[object process]"==={}.toString.call(t.process)?a():u()?f():t.MessageChannel?c():b&&"onreadystatechange"in b.createElement("script")?l():d(),v.setImmediate=r,v.clearImmediate=o}}("undefined"==typeof self?"undefined"==typeof t?this:t:self)}).call(e,function(){return this}(),n(16))},22:function(t,e,n){function r(t,e){this._id=t,this._clearFn=e}var o=Function.prototype.apply;e.setTimeout=function(){return new r(o.call(setTimeout,window,arguments),clearTimeout)},e.setInterval=function(){return new r(o.call(setInterval,window,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t&&t.close()},r.prototype.unref=r.prototype.ref=function(){},r.prototype.close=function(){this._clearFn.call(window,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout(function(){t._onTimeout&&t._onTimeout()},e))},n(21),e.setImmediate=setImmediate,e.clearImmediate=clearImmediate},38:function(t,e,n){"use strict";n(39);var r=n(20);window.Promise||(window.Promise=r.default)},39:function(t,e){!function(t){"use strict";function e(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function n(t){return"string"!=typeof t&&(t=String(t)),t}function r(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return b.iterable&&(e[Symbol.iterator]=function(){return e}),e}function o(t){this.map={},t instanceof o?t.forEach(function(t,e){this.append(e,t)},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function i(t){return t.bodyUsed?Promise.reject(new TypeError("Already read")):void(t.bodyUsed=!0)}function s(t){return new Promise(function(e,n){t.onload=function(){e(t.result)},t.onerror=function(){n(t.error)}})}function a(t){var e=new FileReader,n=s(e);return e.readAsArrayBuffer(t),n}function u(t){var e=new FileReader,n=s(e);return e.readAsText(t),n}function f(t){for(var e=new Uint8Array(t),n=new Array(e.length),r=0;r<e.length;r++)n[r]=String.fromCharCode(e[r]);return n.join("")}function c(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function l(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t,t)if("string"==typeof t)this._bodyText=t;else if(b.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(b.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(b.searchParams&&URLSearchParams.prototype.isPrototypeOf(t))this._bodyText=t.toString();else if(b.arrayBuffer&&b.blob&&w(t))this._bodyArrayBuffer=c(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!b.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t)&&!_(t))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=c(t)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):b.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},b.blob&&(this.blob=function(){var t=i(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?i(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(a)}),this.text=function(){var t=i(this);if(t)return t;if(this._bodyBlob)return u(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(f(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},b.formData&&(this.formData=function(){return this.text().then(p)}),this.json=function(){return this.text().then(JSON.parse)},this}function d(t){var e=t.toUpperCase();return T.indexOf(e)>-1?e:t}function h(t,e){e=e||{};var n=e.body;if("string"==typeof t)this.url=t;else{if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new o(t.headers)),this.method=t.method,this.mode=t.mode,n||null==t._bodyInit||(n=t._bodyInit,t.bodyUsed=!0)}if(this.credentials=e.credentials||this.credentials||"omit",!e.headers&&this.headers||(this.headers=new o(e.headers)),this.method=d(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function p(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var n=t.split("="),r=n.shift().replace(/\+/g," "),o=n.join("=").replace(/\+/g," ");e.append(decodeURIComponent(r),decodeURIComponent(o))}}),e}function y(t){var e=new o;return t.split("\r\n").forEach(function(t){var n=t.split(":"),r=n.shift().trim();if(r){var o=n.join(":").trim();e.append(r,o)}}),e}function m(t,e){e||(e={}),this.type="default",this.status="status"in e?e.status:200,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new o(e.headers),this.url=e.url||"",this._initBody(t)}if(!t.fetch){var b={searchParams:"URLSearchParams"in t,iterable:"Symbol"in t&&"iterator"in Symbol,blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t};if(b.arrayBuffer)var v=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],w=function(t){return t&&DataView.prototype.isPrototypeOf(t)},_=ArrayBuffer.isView||function(t){return t&&v.indexOf(Object.prototype.toString.call(t))>-1};o.prototype.append=function(t,r){t=e(t),r=n(r);var o=this.map[t];this.map[t]=o?o+","+r:r},o.prototype.delete=function(t){delete this.map[e(t)]},o.prototype.get=function(t){return t=e(t),this.has(t)?this.map[t]:null},o.prototype.has=function(t){return this.map.hasOwnProperty(e(t))},o.prototype.set=function(t,r){this.map[e(t)]=n(r)},o.prototype.forEach=function(t,e){for(var n in this.map)this.map.hasOwnProperty(n)&&t.call(e,this.map[n],n,this)},o.prototype.keys=function(){var t=[];return this.forEach(function(e,n){t.push(n)}),r(t)},o.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),r(t)},o.prototype.entries=function(){var t=[];return this.forEach(function(e,n){t.push([n,e])}),r(t)},b.iterable&&(o.prototype[Symbol.iterator]=o.prototype.entries);var T=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];h.prototype.clone=function(){return new h(this,{body:this._bodyInit})},l.call(h.prototype),l.call(m.prototype),m.prototype.clone=function(){return new m(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new o(this.headers),url:this.url})},m.error=function(){var t=new m(null,{status:0,statusText:""});return t.type="error",t};var g=[301,302,303,307,308];m.redirect=function(t,e){if(g.indexOf(e)===-1)throw new RangeError("Invalid status code");return new m(null,{status:e,headers:{location:t}})},t.Headers=o,t.Request=h,t.Response=m,t.fetch=function(t,e){return new Promise(function(n,r){var o=new h(t,e),i=new XMLHttpRequest;i.onload=function(){var t={status:i.status,statusText:i.statusText,headers:y(i.getAllResponseHeaders()||"")};t.url="responseURL"in i?i.responseURL:t.headers.get("X-Request-URL");var e="response"in i?i.response:i.responseText;n(new m(e,t))},i.onerror=function(){r(new TypeError("Network request failed"))},i.ontimeout=function(){r(new TypeError("Network request failed"))},i.open(o.method,o.url,!0),"include"===o.credentials&&(i.withCredentials=!0),"responseType"in i&&b.blob&&(i.responseType="blob"),o.headers.forEach(function(t,e){i.setRequestHeader(e,t)}),i.send("undefined"==typeof o._bodyInit?null:o._bodyInit)})},t.fetch.polyfill=!0}}("undefined"!=typeof self?self:this)}});
//# sourceMappingURL=polyfills.js.map