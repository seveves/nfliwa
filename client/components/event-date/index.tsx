import { Component, h } from 'preact';
import './style.scss';

const React = { createElement: h };
declare const fetch: any;

export default class EventDate extends Component<{date: Date}, {eventDate: string, eventTime: string}> {

  public componentDidMount() {
    this.createEventDate(new Date(this.props.date));
  }

  public render({ date }, { eventDate = '', eventTime = '' }) {
    return (
      <span>
        <span class="event-date">{eventDate}</span>
        <span class="event-time">{eventTime}</span>
      </span>
    );
  }

  private createEventDate(date: Date) {
    const eventDate = date.getUTCDate() + '. ' + this.getMonthName(date.getUTCMonth()) + ' ' + date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const leadingHourZero = hours < 10 ? '0' : '';
    const leadingMinutesZero = minutes < 10 ? '0' : '';
    const eventTime = leadingHourZero + hours + ':' + leadingMinutesZero + minutes + ' Uhr';

    this.setState({ eventDate, eventTime });
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
