import { Component, h } from 'preact';

export default class InnerImage
  extends Component<{ imageUrl: string, alt: string }, { imgSource?: string, opacity?: number }> {

  public componentDidMount() {
    this.update(this.props.imageUrl);
  }

  public componentDidUpdate(prevProps) {
    if (this.props.imageUrl !== prevProps.imageUrl) {
      this.update(this.props.imageUrl);
    }
  }

  public render({ imageUrl, alt }, { imgSource = '', opacity = 0 }) {
    return (
      <img class="fade-in" src={imgSource} style={{ opacity }} alt={alt}/>
    );
  }

  private setOpacity() {
    setTimeout(() => {
      this.setState({ opacity: 1 });
    }, 100);
  }

  private update(imageUrl) {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((imgSource) => {
        this.setState({ imgSource });
        this.setOpacity();
      });
  }
}
