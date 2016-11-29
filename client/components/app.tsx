import { Component, h } from 'preact';
import { Layout } from 'preact-mdl';
import { Router } from 'preact-router';

import EventDetails from './event-details';
import Events from './events';
import Header from './header';
import Posts from './posts';
import Sidebar from './sidebar';

const React = { createElement: h };

export default class App extends Component<{}, {}> {

  private currentUrl: string;

  public render() {
    return (
      <div id="app">
        <Layout fixed-header>
          <Header />
          <Sidebar />
          <Layout.Content>
            <Router onChange={this.handleRoute}>
              <Posts path="/" />
              <Events path="/events" />
              <EventDetails path="/events/:eventId" eventId=""/>
            </Router>
          </Layout.Content>
        </Layout>
      </div>
    );
  }

  private handleRoute = (e) => {
    this.currentUrl = e.url;
  }
}
