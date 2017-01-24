import { Component, h } from 'preact';
import { Layout } from 'preact-mdl';
import { Router } from 'preact-router';

import EventDetails from '../event-details';
import Events from '../events';
import Header from '../header';
import Posts from '../posts';
import Sidebar from '../sidebar';
import StaticPage from '../static';
import SwipeRecognizer from '../swipe';

import MaterialLayoutHelper from './material-layout-helper';

export default class SiteLayout extends Component<{}, { pages }> {

  public shouldComponentUpdate() {
    return false;
  }

  public render({}, { pages = [] }) {
    return (
        <Layout fixed-header fixed-drawer>
          <Header />
          <Sidebar onClick={this.toggleDrawer} />
          <SwipeRecognizer onSwipe={this.swipeDrawer} />
          <Layout.Content>
            <Router onChange={this.onRouteChange}>
              <Posts path="/client" title="Neuigkeiten"/>
              <Events path="/client/events" title="Termine"/>
              <EventDetails path="/client/events/:eventId" title="Termindetails" />
              <StaticPage path="/client/static/:url" />
            </Router>
            <div id="modal"></div>
          </Layout.Content>
        </Layout>
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

  private toggleDrawer = () => {
    const layout = new MaterialLayoutHelper(this);
    if (layout.hasFixedDrawer && !layout.isSmallScreen) {
        return;
    }
    layout.toggleDrawer();
  }

  private swipeDrawer = (direction: string) => {
    const layout = new MaterialLayoutHelper(this);
    if (layout.hasFixedDrawer && !layout.isSmallScreen) {
        return;
    }

    if (direction === 'right' && !layout.isVisible) {
      layout.toggleDrawer();
    }

    if (direction === 'left' && layout.isVisible) {
      layout.toggleDrawer();
    }
  }
}
