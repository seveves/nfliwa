import { Component, h } from 'preact';
import * as Markup from 'preact-markup';
import * as StructuredTextUtils from 'datocms-structured-text-to-html-string';
import { request } from '../../lib/datocms';

import './style.css';

import { STATICS_QUERY } from '../../queries/statics';

export default class StaticPage extends Component {
  fetchStaticPageContent(pageId) {
    request({
      query: STATICS_QUERY,
      variables: { pageid: pageId },
    }).then((data) => {
      this.setState({ page: data.static.data.value.document });
    });
  }

  componentDidMount() {
    this.fetchStaticPageContent(this.props.url);
  }

  componentWillReceiveProps(props) {
    if (this.props.pageId !== props.pageId) {
      this.fetchStaticPageContent(props.pageId);
    }
  }

  shouldComponentUpdate(props) {
    return true;
  }

  render({ pageId, title }, { page }) {
    return (
      <section class="static">
        {page ? (
          <div class="page">
            <h3 class="page-title">{title}</h3>
            <div class="page-body">
              <div class="page-text">
                <Markup markup={StructuredTextUtils.render(page)} type="html" />
              </div>
            </div>
          </div>
        ) : null}
      </section>
    );
  }
}
