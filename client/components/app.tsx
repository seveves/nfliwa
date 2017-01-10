import { Component, h } from 'preact';

import SiteLayout from './layout';

export default class App extends Component<{}, {}> {

  public render() {
    return (
      <div id="app">
        <SiteLayout />
      </div>
    );
  }
}
