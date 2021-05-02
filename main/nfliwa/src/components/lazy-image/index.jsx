import { Component, h } from 'preact';
import Portal from 'preact-portal';

import './style.scss';

import InnerImage from './inner-image/index';

class Img extends Component {
  componentWillUnmount() {
    // this line fixes an issue with preact recycling the img element
    if (this.base !== undefined) {
      this.base.src = this.base[Symbol.for('preactattr')].src = '';
    }
  }

  render(props) {
    return <img {...props} />;
  }
}

export default class LazyImage extends Component {
  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render({ image }, { open = false }) {
    const style = { backgroundImage: 'url(' + image.base64 + ')' };
    return (
      <div>
        <div class="lazy-image" style={style} onClick={this.open}>
          <InnerImage imageUrl={image.imageUrl} alt={'Bild mit ID ' + image.imageId} />
        </div>
        {open ? (
          <Portal into="#modal">
            <div class="popup" onClick={this.close}>
              <Img src={image.imageUrl} alt={'Bild mit Id ' + image.imageId} />
            </div>
          </Portal>
        ) : null}
      </div>
    );
  }
}
