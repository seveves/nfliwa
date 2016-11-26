import { h, Component, render } from 'preact';
import { Link } from 'preact-router';
import { Layout } from 'preact-mdl';

import './style.scss';

const React = { createElement: h };

export default class Header extends Component<{}, {}> {
	render() {
		return (
			<Layout.Header>
				<Layout.HeaderRow>
					<Layout.Title>Naturfreunde Lichtenwald</Layout.Title>
					<Layout.Spacer />
				</Layout.HeaderRow>
			</Layout.Header>
		);
	}
}

