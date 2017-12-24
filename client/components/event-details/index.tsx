import { Component, h, render } from 'preact';

import Markdown from '../../lib/markdown';

import EventDate from '../event-date';
import Location from '../location';

import './style.scss'

export default class EventDetails extends Component<{eventId?, path, title}, {event}> {

  public componentDidMount() {
    this.fetchNextEvents(this.props.eventId);
  }

  public render({ eventId, path, title }, { event = null }) {
    return (
      <section class="event-details">
        { event ?
          <div class="row">
            <div class="col">
              <h3>{event.title}</h3>
              <h4><EventDate date={new Date(event.eventDate)} /></h4>
              <h4>{event.location}</h4>
              <h5>Beschreibung</h5>
              <Markdown markdown={event.body} />
            </div>
            <div class="col margin-sm-auto">
              <Location lat={event.lat} long={event.long}/>
            </div>
          </div> : null }
      </section>
    );
  }

   private fetchNextEvents(eventId) {
    fetch('/client/api/events/' + eventId)
      .then((res) => res.json())
      .then((json) => json || {})
      .then((result) => {
        this.setState({ event: result });
      });
  }
}
