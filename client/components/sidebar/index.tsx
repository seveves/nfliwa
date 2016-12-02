import { Component, h, render } from 'preact';
import { Layout, Navigation } from 'preact-mdl';
import { Link } from 'preact-router';

const React = { createElement: h };

export default class Sidebar extends Component<{onClick}, {}> {

  public shouldComponentUpdate() {
    return false;
  }

  public render({ onClick }) {
    return (
      <Layout.Drawer onClick={onClick} aria-hidden="true">
        <Layout.Title>Navigation</Layout.Title>
        <Navigation>
          <Navigation.Link href="/">Neuigkeiten</Navigation.Link>
          <Navigation.Link href="/events">Termine</Navigation.Link>
        </Navigation>
      </Layout.Drawer>
    );
  }
}
