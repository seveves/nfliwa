import { Component, h } from 'preact';

import './style.scss';

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
