import { Component, h } from 'preact';

const months = {
  0: 'Januar',
  1: 'Februar',
  2: 'März',
  3: 'April',
  4: 'Mai',
  5: 'Juni',
  6: 'Juli',
  7: 'August',
  8: 'September',
  9: 'Oktober',
  10: 'November',
  11: 'Dezember',
};

const MINUTE_IN_SECONDS = 60;
const HOUR_IN_SECONDS = MINUTE_IN_SECONDS * 60;
const DAY_IN_SECONDS = HOUR_IN_SECONDS * 24;

export default class PrettyDate extends Component {
  prettifyDate(date) {
    const delta = Math.round((Date.now() - +date) / 1000);
    let prettyDate = '';

    if (delta < 30) {
      prettyDate = 'Gerade eben';
    } else if (delta < MINUTE_IN_SECONDS) {
      prettyDate = 'Vor ' + delta + ' Sekunden.';
    } else if (delta < 2 * MINUTE_IN_SECONDS) {
      prettyDate = 'Vor einer Minute';
    } else if (delta < HOUR_IN_SECONDS) {
      prettyDate = 'Vor ' + Math.floor(delta / MINUTE_IN_SECONDS) + ' Minuten';
    } else if (Math.floor(delta / HOUR_IN_SECONDS) === 1) {
      prettyDate = 'Vor einer Stunde';
    } else if (delta < DAY_IN_SECONDS) {
      prettyDate = 'Vor ' + Math.floor(delta / HOUR_IN_SECONDS) + ' Stunden';
    } else if (delta < DAY_IN_SECONDS * 2) {
      prettyDate = 'Gestern';
    } else {
      prettyDate = 'Am ' + date.getUTCDate() + '. ' + months[date.getUTCMonth()] + ' ' + date.getUTCFullYear();
    }

    this.setState({ prettyDate });
  }

  componentDidMount() {
    this.prettifyDate(new Date(this.props.date));
  }

  render({ date }, { prettyDate = '' }) {
    return <span>{prettyDate}</span>;
  }
}
