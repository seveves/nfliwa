import { Component, h, render } from 'preact';
import { Layout, Navigation } from 'preact-mdl';
import { Link } from 'preact-router';

const React = { createElement: h };
declare const fetch: any;

export default class Sidebar extends Component<{onClick}, {}> {

  private url: string = '//nfliwa.herokuapp.com';

  public componentDidMount() {
    this.fetchStaticPages();
  }

  public render({ onClick }, { pages = [] }) {
    return (
      <Layout.Drawer onClick={onClick} aria-hidden="true">
        <Layout.Title>Navigation</Layout.Title>
        <Navigation>
          <Navigation.Link href="/">Neuigkeiten</Navigation.Link>
          <Navigation.Link href="/events">Termine</Navigation.Link>
          { pages.map((p) => ( <Navigation.Link href={'/static/' + p.url}>{p.title}</Navigation.Link> )) }
        </Navigation>
      </Layout.Drawer>
    );
  }

  private fetchStaticPages() {
    fetch(this.url + '/api/static')
      .then((res) => res.json())
      .then((json) => this.setState({ pages: json.data }));
  }
}
