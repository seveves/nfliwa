import { Component, h } from 'preact';

const React = { createElement: h };
declare const fetch: any;

export default class PrettyDate extends Component<{date: Date}, {prettyDate: string}> {

  private minute = 60;
  private hour = this.minute * 60;
  private day = this.hour * 24;
  private week = this.day * 7;

  public componentDidMount() {
    this.prettifyDate(new Date(this.props.date));
  }

  public render({ date }, { prettyDate = '' }) {
    return (
      <span>{prettyDate}</span>
    );
  }

  private prettifyDate(date: Date) {
    let delta = Math.round((Date.now() - +date) / 1000);
    let prettyDate = '';

    if (delta < 30) {
      prettyDate = 'Gerade eben';
    } else if (delta < this.minute) {
      prettyDate = 'Vor ' + delta + ' Sekunden.';
    } else if (delta < 2 * this.minute) {
      prettyDate = 'Vor einer Minute';
    } else if (delta < this.hour) {
      prettyDate = 'Vor ' + Math.floor(delta / this.minute) + ' Minuten';
    } else if (Math.floor(delta / this.hour) === 1) {
      prettyDate = 'Vor einer Stunde';
    } else if (delta < this.day) {
      prettyDate = 'Vor ' + Math.floor(delta / this.hour) + ' Stunden';
    } else if (delta < this.day * 2) {
      prettyDate = 'Gestern';
    } else {
      prettyDate = 'Am ' + date.getUTCDate() + '. ' +
        this.getMonthName(date.getUTCMonth()) + ' ' + date.getUTCFullYear();
    }

    this.setState({ prettyDate });
  }

  private getMonthName(month: number) {
    switch (month) {
      case 0:
        return 'Januar';
      case 1:
        return 'Februar';
      case 2:
        return 'März';
      case 3:
        return 'April';
      case 4:
        return 'Mai';
      case 5:
        return 'Juni';
      case 6:
        return 'Juli';
      case 7:
        return 'August';
      case 8:
        return 'September';
      case 9:
        return 'Oktober';
      case 10:
        return 'November';
      case 11:
        return 'Dezember';
      default:
        return 'Unbekannter Monat';
    }
  }
}
