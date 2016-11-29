import { Component, h, render } from 'preact';
import { Layout } from 'preact-mdl';
import { Link } from 'preact-router';

import './style.scss';

const React = { createElement: h };

export default class Header extends Component<{}, {}> {
  public render() {
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
