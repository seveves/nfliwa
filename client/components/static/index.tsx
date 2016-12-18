import { Component, h } from 'preact';
import { Button, Card, Cell, Grid, Icon } from 'preact-mdl';
import './style.scss';

const React = { createElement: h };
declare const fetch: any;

export default class StaticPage extends Component<{url?, path}, {page}> {

  private url: string = '//nfliwa.herokuapp.com';

  public componentDidMount(): void {
    this.fetchStaticPageContent(this.props.url);
  }

	public componentWillReceiveProps(props): void {
    if (this.props.url !== props.url) {
      this.fetchStaticPageContent(props.url);
    }
  }

	public shouldComponentUpdate(props): boolean {
    return true;
  }

  public render({ url, path }, { page }) {
    return (
      <section class="nf-container">
      { page ? 
        <Grid>
          <Grid.Cell class="mdl-cell--12-col">
            <div class="nf-page">
              <h3 class="nf-page__title">{page.title}</h3>
              <div class="nf-page__body">
                <span class="nf-page__text">{page.body}</span>
              </div>
            </div>
          </Grid.Cell>
      </Grid> : null }
      </section>
    );
  }

  private fetchStaticPageContent(url) {
    fetch(this.url + '/api/static/' + url)
      .then((res) => res.json())
      .then((json) => {
        this.setState({ page: json.data })
      });
  }
}
