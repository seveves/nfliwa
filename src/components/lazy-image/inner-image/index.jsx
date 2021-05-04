import { Component, h } from 'preact';

import styles from '../style.css';

export default class InnerImage extends Component {
  setOpacity() {
    setTimeout(() => {
      this.setState({ opacity: 1 });
    }, 100);
  }

  update(src) {
    fetch(src)
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((src) => {
        this.setState({ src });
        this.setOpacity();
      });
  }

  componentDidMount() {
    this.update(this.props.src);
  }

  componentDidUpdate(prevProps) {
    if (this.props.src !== prevProps.src) {
      this.update(this.props.src);
    }
  }

  render({ alt, title }, { src = '', opacity = 0 }) {
    return <img className={styles.fadeIn} src={src} style={{ opacity }} alt={alt} title={title} />;
  }
}
