import { Component, h } from 'preact';

import * as marked from 'marked';
import * as Markup from 'preact-markup';

export default class Markdown extends Component<{markdown, props?}, {}> {

  private options: any = {
    breaks: true,
    gfm: true,
  };

  public render({ markdown, props }, {}) {
    return (
      <Markup markup={this.markdownToHtml(markdown)} type="html" {...props} />
    );
  }

  private markdownToHtml(md) {
    return marked(md, this.options);
  }
};
