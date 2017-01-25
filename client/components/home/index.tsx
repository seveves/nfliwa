import { Component, h } from 'preact';
import { Grid } from 'preact-mdl';
import './style.scss';

import Markdown from '../../lib/markdown';

export default class Home extends Component<{path, title}, {page}> {

  public componentDidMount(): void {
    this.fetchPageContent();
  }

  public render({ }, { page }) {
    return (
      <section class="nf-container">
      { page ?
        <Grid>
          <Grid.Cell class="mdl-cell--12-col">
            <div class="nf-page">
              <div class="nf-page__body">
                <div class="nf-page__text">
                  <Markdown markdown={page.body} />
                </div>
              </div>
            </div>
          </Grid.Cell>
      </Grid> : null }
      </section>
    );
  }

  private fetchPageContent() {
    fetch('/client/api/static/home')
      .then((res) => res.json())
      .then((json) => {
        this.setState({ page: (json as any).data });
      });
  }
}
