import { Component, h } from 'preact';

import './style.scss';

import { months } from '../../lib/months';

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

  private createEventDate(date: Date): void {
    const eventDate = date.getUTCDate() + '. ' + months[date.getUTCMonth()] + ' ' + date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const leadingHourZero = hours < 10 ? '0' : '';
    const leadingMinutesZero = minutes < 10 ? '0' : '';
    const eventTime = leadingHourZero + hours + ':' + leadingMinutesZero + minutes + ' Uhr';

    this.setState({ eventDate, eventTime });
  }
}
