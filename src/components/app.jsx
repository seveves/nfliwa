import { Component, h } from 'preact';

import './style.css';

import SiteLayout from './layout';

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <SiteLayout />
      </div>
    );
  }
}
