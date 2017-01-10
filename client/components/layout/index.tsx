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
            <Router>
              <Posts path="/client" />
              <Events path="/client/events" />
              <EventDetails path="/client/events/:eventId" />
              <StaticPage path="/client/static/:url" />
            </Router>
            <div id="modal"></div>
          </Layout.Content>
        </Layout>
    );
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
  }
}
