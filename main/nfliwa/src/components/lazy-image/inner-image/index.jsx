import { Component, h } from 'preact';

export default class InnerImage extends Component {
  setOpacity() {
    setTimeout(() => {
      this.setState({ opacity: 1 });
    }, 100);
  }

  update(imageUrl) {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((imgSource) => {
        this.setState({ imgSource });
        this.setOpacity();
      });
  }

  componentDidMount() {
    this.update(this.props.imageUrl);
  }

  componentDidUpdate(prevProps) {
    if (this.props.imageUrl !== prevProps.imageUrl) {
      this.update(this.props.imageUrl);
    }
  }

  render({ alt }, { imgSource = '', opacity = 0 }) {
    return <img class="fade-in" src={imgSource} style={{ opacity }} alt={alt} />;
  }
}
