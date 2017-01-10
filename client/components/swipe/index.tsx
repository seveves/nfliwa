import { cloneElement, Component, h } from 'preact';

export default class SwipeRecognizer extends Component<{ onSwipe?: (direction: string) => void }, {}> {
  private tolerance = 100;
  private gesture = { x: [], y: [], match: '' };

  public componentDidMount() {
    addEventListener('touchstart', this.capture);
    addEventListener('touchmove', this.capture);
    addEventListener('touchend', this.compute);
  }

  public componentWillUnmount() {
    removeEventListener('touchstart', this.capture);
    removeEventListener('touchmove', this.capture);
    removeEventListener('touchend', this.compute);
  }

  public onSwipe = (direction: string) => {
    if (this.props.onSwipe) {
      this.props.onSwipe(direction);
    }
    this.setState({ swipe: direction });
  }

  public render({ children }) {
    return children[0];
  }

  private capture = (event: TouchEvent) => {
    this.gesture.x.push(event.touches[0].clientX);
    this.gesture.y.push(event.touches[0].clientY);
  }

  private compute = (event: TouchEvent) => {
    const xStart = this.gesture.x[0];
    const yStart = this.gesture.y[0];
    const xEnd = this.gesture.x.pop();
    const yEnd = this.gesture.y.pop();
    const xTravel = xEnd - xStart;
    const yTravel = yEnd - yStart;

    if (xTravel < this.tolerance &&
        xTravel > -this.tolerance &&
        yTravel < -this.tolerance) {
      this.gesture.match = 'up';
    }

    if (xTravel < this.tolerance &&
        xTravel > -this.tolerance &&
        yTravel > this.tolerance) {
      this.gesture.match = 'down';
    }

    if (yTravel < this.tolerance &&
        yTravel > -this.tolerance &&
        xTravel < -this.tolerance) {
      this.gesture.match = 'left';
    }

    if (yTravel < this.tolerance &&
        yTravel > -this.tolerance &&
        xTravel > this.tolerance) {
      this.gesture.match = 'right';
    }

    if (this.gesture.match !== '') {
      this.onSwipe(this.gesture.match);
    }

    this.gesture.x = [];
    this.gesture.y = [];
    this.gesture.match = '';
  }
}
