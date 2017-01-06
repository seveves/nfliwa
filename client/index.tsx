import 'marked';
import 'material-design-lite';

import 'material-design-icons/iconfont/material-icons.css';
import 'material-design-lite/dist/material.green-light_green.min.css';

import { h, render } from 'preact';
import './scss/index.scss';

const React = { createElement: h };

import App from './components/app';
render(<App />, document.body);
