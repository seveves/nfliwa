import 'marked';
import 'material-design-icons/iconfont/material-icons.css';
import 'material-design-icons/iconfont/MaterialIcons-Regular.ttf';
import 'material-design-icons/iconfont/MaterialIcons-Regular.woff';
import 'material-design-icons/iconfont/MaterialIcons-Regular.woff2';
import 'material-design-lite';
import 'material-design-lite/dist/material.green-light_green.min.css';
import 'whatwg-fetch';

import Promise from 'promise-polyfill';
if (!window.Promise) {
  window.Promise = Promise;
}

if (navigator && navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' })
    .catch((error) => console.warn('service worker registration failed with ' + error));
} else {
  console.warn('service worker API not available. poor you.');
}

import { h, render } from 'preact';
import './scss/index.scss';

const React = { createElement: h };

import App  from './components/app';
render(<App />, document.body);
