import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Layout } from 'preact-mdl';

import Header from './header';
import Sidebar from './sidebar';
import Posts from './posts';
import Events from './events';

const React = { createElement: h };

export default class App extends Component<{},{}> {

	private currentUrl: string;

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Layout fixed-header>
					<Header />
					<Sidebar />
					<Layout.Content>
						<Router onChange={this.handleRoute}>
							<Posts path="/" />
							<Events path="/events" />
						</Router>
					</Layout.Content>
				</Layout>
			</div>
		);
	}
}