import { Component, h } from 'preact';
import Markup from 'preact-markup';
import * as StructuredText from 'datocms-structured-text-to-html-string';
import { request } from '../../lib/datocms';

import styles from './style.css';

import { STATICS_QUERY } from '../../queries/statics';
import ImageGallery from '../../components/image-gallery';

export default class StaticPage extends Component {
  fetchStaticPageContent(pageId) {
    request({
      query: STATICS_QUERY,
      variables: { pageid: pageId },
    }).then((data) => {
      const markup = StructuredText.render(data.static.data);
      this.setState({
        markup,
        gallery: data.static.gallery != null && data.static.gallery.length > 0 ? data.static.gallery.map((i) => i.responsiveImage) : null,
        pageTitle: data.static.title,
        image: data.static.image != null ? data.static.image.responsiveImage : null,
        enbw: data.static.enbw != null ? data.static.enbw.responsiveImage : null,
      });
    });
  }

  componentDidMount() {
    this.fetchStaticPageContent(this.props.pageId);
  }

  componentWillReceiveProps(props) {
    if (this.props.pageId !== props.pageId) {
      this.setState({ gallery: null, markup: null, pageTitle: null, image: null, enbw: null });
      this.fetchStaticPageContent(props.pageId);
    }
  }

  shouldComponentUpdate(props) {
    return true;
  }

  render({ pageId, title }, { gallery, markup, image, enbw, pageTitle }) {
    return (
      <section>
        <div className={styles.page}>
          <h3 className={styles.pageTitle}>{pageTitle || title}</h3>
          {image && <img className={styles.pageImage} src={image.src} alt={image.alt} title={image.title} />}
          <div className={styles.pageBody}>{markup && <Markup markup={markup} type="html" />}</div>
          {enbw && <img className={styles.enbw} src={enbw.src} alt={enbw.alt} title={enbw.title} />}
          {gallery && <ImageGallery items={gallery}></ImageGallery>}
        </div>
      </section>
    );
  }
}
