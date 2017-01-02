import { Component, h } from 'preact';
import * as Markup from 'preact-markup';
import * as marked  from 'marked';

const React = { createElement: h };

export default class Markdown extends Component<{markdown, props?}, {}> {

  private options: any = {
	  // sanitize: true
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