import { Component, h } from 'preact';
import { Router } from 'preact-router';

import Header from '../header';
import Home from '../../routes/home';
import Posts from '../posts';
import StaticPage from '../../routes/static';

export default class SiteLayout extends Component {
  shouldComponentUpdate() {
    return false;
  }

  onRouteChange = (obj) => {
    const title = obj.current.attributes.title;
    if (title) {
      const staticPart = 'NaturFreunde Plochingen-Reichenbach-Lichtenwald';
      document.title = `${title} | ${staticPart}`;
    }
  };

  render() {
    return (
      <div>
        <Header />
        <div class="container">
          <Router onChange={this.onRouteChange}>
            <Home path="/" title="Willkommen" />
            <Posts path="/posts" title="Neuigkeiten" />
            <StaticPage path="/gruppen" title="Gruppen" pageId="groups" />
            <StaticPage path="/wanderwege" title="Wanderwege" pageId="hikes" />
            <StaticPage path="/termine" title="Termine" pageId="events" />
            <StaticPage path="/datenschutz" title="Datenschutz" pageId="dataprivacy" />
            <StaticPage path="/impressum" title="Impressum" pageId="imprint" />
            <StaticPage path="/mitgliedschaft" title="Mitgliedschaft" pageId="membership" />
            <Home default />
          </Router>
          <div id="modal"></div>
        </div>
      </div>
    );
  }
}
