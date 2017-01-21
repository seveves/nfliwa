import * as Promise from 'promise-polyfill';

if (!(`Promise` in window)) {
  (window as any).Promise = Promise;
}

import 'whatwg-fetch';
