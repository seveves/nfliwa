import { Component, h, render } from 'preact';

import './style.scss';

import EventDate from '../event-date/index';

export default class Events extends Component<{path, title}, {nextEvents?, pastEvents?}> {

  public componentDidMount() {
    this.fetchNextEvents();
    this.fetchPastEvents();
  }

  public render({ }, { nextEvents = [], pastEvents = [] }) {
    return (
      <section class="events">
        <div class="row">
          <div class="col">
            <h3 class="event-title">Kommende Veranstaltungen</h3>
            { nextEvents.length ? null : <h4>Keine Veranstaltungen geplant.</h4> }
            <div>
              { nextEvents.map((event) => ( <EventItem event={event} />)) }
            </div>
          </div>
          <div class="col">
            <h3 class="event-title">Vergangene Veranstaltungen</h3>
            { pastEvents.length ? null : <h4>Keine vergangene Veranstaltungen.</h4> }
            <ul class="event-list">
              { pastEvents.map((event) => ( <EventItem event={event} />)) }
            </ul>
          </div>
        </div>
      </section>
    );
  }

  private fetchNextEvents() {
    fetch('/client/api/events/next')
      .then((res) => res.json())
      .then((json) => json || [])
      .then((result) => {
        this.setState({ nextEvents: result });
      });
  }

  private fetchPastEvents() {
    fetch('/client/api/events/last')
      .then((res) => res.json())
      .then((json) => json || [])
      .then((result) => {
        this.setState({ pastEvents: result });
      });
  }
}

const EventItem = ({ event }) => (
  <li>
    <a href={'/client/events/' + event._id} alt={event.title + ' Details'}>
      <span>{event.title}</span>
    </a>
    <div>{event.location}</div>
    <EventDate date={event.eventDate} />
  </li>
);
