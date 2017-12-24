import { Component, h } from 'preact';

import './style.scss';

import Markdown from '../../lib/markdown';

export default class StaticPage extends Component<{url?, path}, {page}> {

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
      <section class="static">
      { page ?
        <div class="page">
          <h3 class="page-title">{page.title}</h3>
          <div class="page-body">
            <div class="page-text">
              <Markdown markdown={page.body} />
            </div>
          </div>
        </div> : null }
      </section>
    );
  }

  private fetchStaticPageContent(url) {
    fetch('/client/api/static/' + url)
      .then((res) => res.json())
      .then((json) => {
        this.setState({ page: (json as any).data });
      });
  }
}
