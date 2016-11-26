import { h, Component, render } from 'preact';
import './style.scss';

const React = { createElement: h };

export default class Events extends Component<{path}, {}> {
	render() {
		return (
			<div class="events">
				<h1>Termine</h1>
				<p>Hier werden bald alle Termine aufgelistet.</p>
			</div>
		);
	}
}