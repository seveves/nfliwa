import { Component, h } from 'preact';
import { Router } from 'preact-router';

import EventDetails from '../event-details';
import Events from '../events';
import Header from '../header';
import Home from '../home';
import Posts from '../posts';
import StaticPage from '../static';

export default class SiteLayout extends Component<{}, { pages }> {

  public shouldComponentUpdate() {
    return false;
  }

  public render({}, { pages = [] }) {
    return (
        <div>
          <Header />
          <div class="container">
            <Router onChange={this.onRouteChange}>
              <Home path="/client" title="Willkommen" />
              <Posts path="/client/posts" title="Neuigkeiten"/>
              <Events path="/client/events" title="Termine"/>
              <EventDetails path="/client/events/:eventId" title="Termindetails" />
              <StaticPage path="/client/static/:url" />
            </Router>
            <div id="modal"></div>
          </div>
        </div>
    );
  }

  private onRouteChange = (obj) => {
    const staticPart = ' | Naturfreunde Lichtenwald e.V.';
    if (obj.current.attributes.title) {
      document.title = obj.current.attributes.title + staticPart;
      return;
    }

    if ((obj.url as string).startsWith('/client/static')) {
      this.fetchStaticTitle(obj.current.attributes.url).then((json) => {
        document.title = json.data + staticPart;
      });
    }
  }

  private fetchStaticTitle(url): Promise<any> {
    return fetch('/client/api/static/title/' + url)
      .then((res) => res.json());
  }
}
