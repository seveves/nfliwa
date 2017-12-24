import { Component, h } from 'preact';

export default class Location
  extends Component<{ lat, long }, { imgSource?: string }> {

  public componentDidMount() {
    this.update();
  }

  public render({ lat, long }, { imgSource = '' }) {
    return (
      <div>
        <div>
          <img src={imgSource} style="margin-bottom: 10px; max-width: 100%; height: auto;" />
        </div>
        <a class="mdl-button mdl-js-button mdl-button--raised" href={'//maps.google.com/?q=' + lat + ',' + long}>In Google Maps öffnen</a>
      </div>
    );
  }

  private update() {
    const imageUrl = '/client/api/events/location?lat=' + this.props.lat + '&long=' + this.props.long;

    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((imgSource) => {
        this.setState({ imgSource });
      });
  }
}
