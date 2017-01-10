import 'whatwg-fetch';

import Promise from 'promise-polyfill';

if (!(`Promise` in window)) {
  (window as any).Promise = Promise;
}
