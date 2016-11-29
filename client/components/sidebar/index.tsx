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
      <Layout.Drawer onClick={this.hide}>
        <Layout.Title>Navigation</Layout.Title>
        <Navigation>
          <Navigation.Link href="/">Neuigkeiten</Navigation.Link>
          <Navigation.Link href="/events">Termine</Navigation.Link>
        </Navigation>
      </Layout.Drawer>
    );
  }

  private hide = () => {
    this.base.classList.remove('is-visible');
  }
}
