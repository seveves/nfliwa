import { h, Component, render } from 'preact';
import { Grid, Card, Cell, Icon, Button } from 'preact-mdl';
import './style.scss';

import EventDate from '../event-date';

const React = { createElement: h };
declare const fetch: any;

export default class Events extends Component<{path}, {nextEvents?,pastEvents?}> {

	private url: string = '//' + window.location.host;

	fetchNextEvents() {
		fetch(this.url + '/api/events/next')
			.then(res => res.json())
			.then(json => json || [])
			.then(result => {
				this.setState({ nextEvents: result });
			});
	}

	fetchPastEvents() {
		fetch(this.url + '/api/events/last')
			.then(res => res.json())
			.then(json => json || [])
			.then(result => {
				this.setState({ pastEvents: result });
			});
	}

	componentDidMount() {
		this.fetchNextEvents();
		this.fetchPastEvents();
	}

	render({ }, { nextEvents=[], pastEvents=[] }) {
		return (
			<section class="nf-container">
				<Grid>
					<Grid.Cell class="mdl-cell--8-col">
						<h3>Kommende Termine</h3>						
						<Grid>
							{ nextEvents.map(event => ( <NextEvent event={event} />)) }
						</Grid>
					</Grid.Cell>
					<Grid.Cell class="mdl-cell--4-col">
						<h3>Vergangene Termine</h3>
						<ul class="mdl-list">
							{ pastEvents.map(event => ( <PastEvent event={event} />)) }							
						</ul>
					</Grid.Cell>			
				</Grid>
			</section>
		);
	}
}

const NextEvent = ({ event }) => (
	<Grid.Cell class="mdl-cell--6-col">
		<div class="event-card mdl-card mdl-shadow--2dp">
			<div class="mdl-card__title mdl-card--expand">
				<h4>{event.title}</h4>	
			</div>
			<div class="mdl-card__supporting-text">
				<p>
				<span class="card-location">{event.location}</span><br/>
				<div class="card-date"><EventDate date={new Date(event.eventDate)} /></div>
				</p>
			</div>
			<div class="mdl-card__actions mdl-card--border">
				<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href={'/events/' + event._id}>
					<Icon icon="event" /> Details
				</a>
			</div>
		</div>
	</Grid.Cell>
);

const PastEvent = ({ event }) => (
	<li class="mdl-list__item mdl-list__item--three-line">
		<span class="mdl-list__item-primary-content">
      <Icon icon="event" class="mdl-list__item-avatar"></Icon>
      <span>{event.title}</span>
      <div class="mdl-list__item-text-body">
				<div>{event.location}</div>
				<div>
					<EventDate date={event.eventDate} />
				</div>
			</div>
    </span>
    <span class="mdl-list__item-secondary-content">
      <a class="mdl-list__item-secondary-action" href={'/events/' + event._id}>
				<Icon icon="details" />
			</a>
    </span>
  </li>
);