import { Component, h } from 'preact';
import { Button, Grid, Icon } from 'preact-mdl';
import './style.scss';

import Markdown from '../../lib/markdown';

import LazyImage from '../lazy-image';
import PrettyDate from '../pretty-date';

export default class Posts extends Component<{path}, {posts, next}> {

  public componentDidMount() {
    this.fetchPosts('/client/api/posts?a=6&p=0');
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
    fetch(apiUrl)
      .then((res) => res.json())
      .then((json) => json || [])
      .then((result: any) => {
        const posts = this.state.posts || [];
        this.setState({ posts: posts.concat(result.posts), next: result.next });
      });
  }

  private loadMore = () => {
    this.fetchPosts(this.state.next);
  }
}

const Post = ({ data, last }) => (
    <Grid>
      <Grid.Cell class={ data.images.length > 0 ? 'mdl-cell--6-col' : 'mdl-cell--12-col'}>
        <div class="nf-post">
          <a class="nf-post__link" href={'#' + encodeURI(data.title).toLowerCase()}>
            <h3 class="nf-post__title" id={encodeURI(data.title).toLowerCase()}>{data.title}</h3>
          </a>
          <div class="nf-post__body">
            <span class="nf-post__date"><PrettyDate date={data.date} /></span>
            <div class="nf-post__text">
              <Markdown markdown={data.body} />
            </div>
          </div>
        </div>
      </Grid.Cell>
      { data.images.length > 0 ?
      <Grid.Cell class="mdl-cell--6-col">
        <div class="nf-post__images">
          { data.images.map((image) => ( <LazyImage image={image} />))}
        </div>
      </Grid.Cell> : null }
      { last ? null : <Grid.Cell class="nf-post__footer mdl-cell--12-col"></Grid.Cell> }
    </Grid>
);
