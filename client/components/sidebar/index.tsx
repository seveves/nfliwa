import { h, Component, render } from 'preact';
import { Link } from 'preact-router';
import { Layout, Navigation } from 'preact-mdl';

const React = { createElement: h };

export default class Sidebar extends Component<{}, {}> {

	shouldComponentUpdate() {
		return false;
	}

	hide = () => {
		this.base.classList.remove('is-visible');
	};

	render() {
		return (
			<Layout.Drawer onClick={this.hide}>
				<Layout.Title>Navigation</Layout.Title>
				<Navigation>
					<Navigation.Link href="/">Neuigkeiten</Navigation.Link>
					<Navigation.Link href="/events">Termine</Navigation.Link>
				</Navigation>
			</Layout.Drawer>
		);
	}
}