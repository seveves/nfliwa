import { h, Component } from 'preact';
import './style.scss';

const React = { createElement: h };
declare const fetch: any;

interface IImage {
  imageId: string;
  imageUrl: String;
  base64: string;
}

export default class LazyImage extends Component<{ image: IImage }, {}> {

  render({ image }) {

    let style = { backgroundImage: 'url(' + image.base64 + ')' };

    return (
      <div class="lazy-image" style={style}>
        <InnerImage imageUrl={image.imageUrl} />
      </div>
    );
  }
}

class InnerImage extends Component<{ imageUrl: string }, { imgSource?: string, opacity?: number }> {
  setOpacity() {
    setTimeout(() => {
      this.setState({ opacity: 1 });
    }, 100);
  }

  update(imageUrl) {
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => URL.createObjectURL(blob))
      .then(imgSource => {
        this.setState({ imgSource });
        this.setOpacity();
      });
  }

  // on first mount, we'll always load the image
  componentDidMount() {
    this.update(this.props.imageUrl);
  }

  // if we get re-rendered with a new imageUrl, update the image
  componentDidUpdate(prevProps) {
    if (this.props.imageUrl!==prevProps.imageUrl) {
      this.update(this.props.imageUrl);
    }
  }

  render({ imageUrl }, { imgSource='', opacity=0 }) {
    return (
      <img class="fade-in" src={imgSource} style={{ opacity }} />
    );
  }
}