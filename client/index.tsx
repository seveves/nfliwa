import 'material-design-icons/iconfont/material-icons.css';
import 'material-design-icons/iconfont/MaterialIcons-Regular.ttf';
import 'material-design-icons/iconfont/MaterialIcons-Regular.woff';
import 'material-design-icons/iconfont/MaterialIcons-Regular.woff2';
import 'material-design-lite';
import 'material-design-lite/dist/material.green-light_green.min.css';
import 'whatwg-fetch';
import 'marked';

import Promise from 'promise-polyfill';
if (!window.Promise) {
  window.Promise = Promise;
}

import { h, render } from 'preact';
import './scss/index.scss';

const React = { createElement: h };

import App  from './components/app';
render(<App />, document.body);
