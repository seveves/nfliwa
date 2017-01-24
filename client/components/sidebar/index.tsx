import { Component, h, render } from 'preact';
import { Icon, Layout, Navigation } from 'preact-mdl';
import { Link } from 'preact-router';

import './style.scss';

export default class Sidebar extends Component<{onClick}, {}> {

  public componentDidMount() {
    this.fetchStaticPages();
  }

  public render({ onClick }, { pages = [] }) {
    return (
      <Layout.Drawer onClick={onClick} aria-hidden="true">
        <Layout.Title>Navigation</Layout.Title>
        <Navigation>
          <Navigation.Link href="/client" alt="Neuigkeiten"><Icon icon="navigate next"/> Neuigkeiten</Navigation.Link>
          <Navigation.Link href="/client/events" alt="Termine"><Icon icon="navigate next"/> Termine</Navigation.Link>
          { pages.map((p) => (
            <Navigation.Link href={'/client/static/' + p.url} alt={p.title}>
              <Icon icon="navigate next"/> {p.title}
            </Navigation.Link> ))
          }
        </Navigation>
        <img style="margin: auto; width: 50%; height: auto; opacity: 0.7" src="/client/img/nf-logo.png" alt="Logo" />
        <div style="margin: auto; width: 50%;">
          <div style="float: left">
            <a class="sm-logo" href="https://fb.me/naturfreundelichtenwald" alt="Facebook Seite">
              <img src="/client/img/fb-logo.png" alt="Facebook Logo"/>
            </a>
          </div>
          <div>
            <a class="sm-logo" href="https://instagram.com/naturfreundelichtenwald" alt="Instagram Seite">
              <img src="/client/img/instagram-logo.png" alt="Instagram Logo" />
            </a>
          </div>
        </div>
      </Layout.Drawer>
    );
  }

  private fetchStaticPages() {
    fetch('/client/api/static')
      .then((res) => res.json())
      .then((json) => this.setState({ pages: (json as any).data }));
  }
}
