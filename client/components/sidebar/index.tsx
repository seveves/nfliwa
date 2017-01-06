import { Component, h, render } from 'preact';
import { Icon, Layout, Navigation } from 'preact-mdl';
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
          <Navigation.Link href="/client"><Icon icon="navigate next"/> Neuigkeiten</Navigation.Link>
          <Navigation.Link href="/client/events"><Icon icon="navigate next"/> Termine</Navigation.Link>
          { pages.map((p) => (
            <Navigation.Link href={'/client/static/' + p.url}>
              <Icon icon="navigate next"/> {p.title}
            </Navigation.Link> ))
          }
        </Navigation>
        <img style="margin: auto; width: 50%; height: auto; opacity: 0.7" src="/img/nf-logo.png" />
      </Layout.Drawer>
    );
  }

  private fetchStaticPages() {
    fetch(this.url + '/api/static')
      .then((res) => res.json())
      .then((json) => this.setState({ pages: json.data }));
  }
}
