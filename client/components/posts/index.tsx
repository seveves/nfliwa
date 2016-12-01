import { Component, h } from 'preact';
import { Button, Card, Cell, Grid, Icon } from 'preact-mdl';
import './style.scss';

import LazyImage from '../lazy-image';
import PrettyDate from '../pretty-date';

const React = { createElement: h };
declare const fetch: any;

export default class Posts extends Component<{path}, {posts, next}> {

  private url: string = '//nfliwa.herokuapp.com';

  public componentDidMount() {
    this.fetchPosts('/api/posts?a=6&p=0');
  }

  public render({ }, { posts = [] }) {
    return (
      <section class="nf-container">
        { posts.map((post, i) => ( <Post data={post} last={i === (posts.length - 1)} />)) }
        { this.state.next ?
          <Grid>
            <Grid.Cell class="mdl-cell--12-col">
              <div class="nf-post">
                <Button class="nf-load-more" raised accent onClick={this.loadMore}>
                  Weitere laden<Icon icon="expand more" />
                </Button>
              </div>
            </Grid.Cell>
          </Grid> : null }
      </section>
    );
  }

  private fetchPosts(apiUrl) {
    fetch(this.url + apiUrl)
      .then((res) => res.json())
      .then((json) => json || [])
      .then((result) => {
        let posts = this.state.posts || [];
        this.setState({ posts: posts.concat(result.posts), next: result.next });
      });
  }

  private loadMore = () => {
    this.fetchPosts(this.state.next);
  }
}

const Post = ({ data, last }) => (
    <Grid>
      <Grid.Cell class="mdl-cell--6-col">
        <div class="nf-post">
          <h3 class="nf-post__title">{data.title}</h3>
          <div class="nf-post__body">
            <span class="nf-post__date"><PrettyDate date={data.date} /></span>
            <span class="nf-post__text">{data.body}</span>
          </div>
        </div>
      </Grid.Cell>
      <Grid.Cell class="mdl-cell--6-col">
        <div class="nf-post__images">
          { data.images.map((image) => ( <LazyImage image={image} />))}
        </div>
      </Grid.Cell>
      { last ? null : <Grid.Cell class="nf-post__footer mdl-cell--12-col"></Grid.Cell> }
    </Grid>
);
