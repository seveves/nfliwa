import { Component, h } from 'preact';
import { Layout } from 'preact-mdl';
import { Router } from 'preact-router';

import SiteLayout from './layout';

const React = { createElement: h };

export default class App extends Component<{}, {}> {

  public render() {
    return (
      <div id="app">
        <SiteLayout />
      </div>
    );
  }
}
