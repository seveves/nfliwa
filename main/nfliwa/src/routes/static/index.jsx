import { Component, h } from 'preact';
import * as Markup from 'preact-markup';

import './style.scss';

export default class StaticPage extends Component {
  fetchStaticPageContent(url) {
    fetch('/client/api/static/' + url)
      .then((res) => res.json())
      .then((json) => {
        this.setState({ page: json.data });
      });
  }

  componentDidMount() {
    this.fetchStaticPageContent(this.props.url);
  }

  componentWillReceiveProps(props) {
    if (this.props.url !== props.url) {
      this.fetchStaticPageContent(props.url);
    }
  }

  shouldComponentUpdate(props) {
    return true;
  }

  render({ url, path }, { page }) {
    return (
      <section class="static">
        {page ? (
          <div class="page">
            <h3 class="page-title">{page.title}</h3>
            <div class="page-body">
              <div class="page-text">
                <Markup markup={page.body} type="html" />
              </div>
            </div>
          </div>
        ) : null}
      </section>
    );
  }
}
