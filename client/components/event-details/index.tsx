import { Component, h, render } from 'preact';
import { Button, Card, Cell, Grid, Icon } from 'preact-mdl';

const React = { createElement: h };
declare const fetch: any;

import EventDate from '../event-date';
import Location from '../location';

export default class EventDetails extends Component<{eventId?, path}, {event}> {

  private url: string = '//nfliwa.herokuapp.com';

  public componentDidMount() {
    this.fetchNextEvents(this.props.eventId);
  }

  public render({ eventId, path }, { event = null }) {
    return (
      <section class="nf-container">
        <Grid>
          <Grid.Cell class="mdl-cell--12-col">
          { event ?
            <div class="nf-event">
              <h3 class="nf-event__title">{event.title}</h3>
              <h4 class="nf-event__date"><Icon icon="event"/> <EventDate date={new Date(event.eventDate)} /></h4>
              <h4 class="nf-event__location"><Icon icon="location on"/> {event.location}</h4>
              <Location lat={event.lat} long={event.long}/>
              <h5>Beschreibung</h5>
              <p class="nf-event__text">{event.body}</p>
            </div> : '' }
          </Grid.Cell>
        </Grid>
        <Grid>
          <Grid.Cell class="mdl-cell--2-col">
            <a class="mdl-button mdl-button--colored" href="/events">
              <Icon icon="arrow back"/> Zurück zur Übersicht
            </a>
          </Grid.Cell>
        </Grid>
      </section>
    );
  }

   private fetchNextEvents(eventId) {
    fetch(this.url + '/api/events/' + eventId)
      .then((res) => res.json())
      .then((json) => json || {})
      .then((result) => {
        this.setState({ event: result });
      });
  }
}
