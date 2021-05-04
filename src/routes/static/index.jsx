import { Component, h } from 'preact';
import Markup from 'preact-markup';
import * as StructuredText from 'datocms-structured-text-to-html-string';
import { request } from '../../lib/datocms';

import styles from './style.css';

import { STATICS_QUERY } from '../../queries/statics';

export default class StaticPage extends Component {
  fetchStaticPageContent(pageId) {
    request({
      query: STATICS_QUERY,
      variables: { pageid: pageId },
    }).then((data) => {
      const markup = StructuredText.render(data.static.data.value.document);
      this.setState({ markup });
    });
  }

  componentDidMount() {
    this.fetchStaticPageContent(this.props.pageId);
  }

  componentWillReceiveProps(props) {
    if (this.props.pageId !== props.pageId) {
      this.setState({ markup: null });
      this.fetchStaticPageContent(props.pageId);
    }
  }

  shouldComponentUpdate(props) {
    return true;
  }

  render({ pageId, title }, { markup }) {
    return (
      <section>
        <div className={styles.page}>
          <h3 className={styles.pageTitle}>{title}</h3>
          <div className={styles.pageBody}>{markup && <Markup markup={markup} type="html" />}</div>
        </div>
      </section>
    );
  }
}
