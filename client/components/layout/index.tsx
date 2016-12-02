import { Component, h } from 'preact';
import { Layout } from 'preact-mdl';
import { Router } from 'preact-router';

import EventDetails from '../event-details';
import Events from '../events';
import Header from '../header';
import Posts from '../posts';
import Sidebar from '../sidebar';

import MaterialLayoutHelper from './material-layout-helper';

const React = { createElement: h };

export default class SiteLayout extends Component<{}, {}> {

  private currentUrl: string;

  public render() {
    return (
        <Layout fixed-header>
          <Header />
          <Sidebar onClick={this.toggleDrawer} />
          <Layout.Content>
            <Router>
              <Posts path="/" />
              <Events path="/events" />
              <EventDetails path="/events/:eventId"/>
            </Router>
          </Layout.Content>
        </Layout>
    );
  }

  private toggleDrawer = () => {
    let layout = new MaterialLayoutHelper(this);
    if (layout.hasFixedDrawer && !layout.isSmallScreen) {
        return;
    }
    layout.toggleDrawer();
  }
}
