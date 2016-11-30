import { Component, h, render } from 'preact';
import { Layout, Navigation } from 'preact-mdl';
import { Link } from 'preact-router';

const React = { createElement: h };

export default class Sidebar extends Component<{}, {}> {

  public shouldComponentUpdate() {
    return false;
  }

  public render() {
    return (
      <Layout.Drawer onClick={this.hide} aria-hidden="true">
        <Layout.Title>Navigation</Layout.Title>
        <Navigation>
          <Navigation.Link href="/">Neuigkeiten</Navigation.Link>
          <Navigation.Link href="/events">Termine</Navigation.Link>
        </Navigation>
      </Layout.Drawer>
    );
  }

  private hide = () => {
    let layout = this.base.parentNode as any;
    layout.MaterialLayout.toggleDrawer();
  }
}
