import { Component, h } from 'preact';
import { createPortal } from 'preact/compat';

import styles from './style.css';

import InnerImage from './inner-image/index';

class Popup extends Component {
  render({ image, close }) {
    return (
      <div className="popup" onClick={close}>
        <img src={image.src} alt={image.alt} title={image.title} />
      </div>
    );
  }
}

export default class LazyImage extends Component {
  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render({ image }, { open = false }) {
    const style = { backgroundImage: `url(${image.base64})` };
    const container = typeof window !== undefined ? document.getElementById('modal') : null;
    return (
      <div>
        <div className={styles.lazyImage} style={style} onClick={this.open}>
          <InnerImage src={image.src} alt={image.alt} title={image.title} />
        </div>
        {open ? createPortal(<Popup image={image} close={this.close} />, container) : null}
      </div>
    );
  }
}
