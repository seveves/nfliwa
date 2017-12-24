import { Component, h } from 'preact';

import './style.scss';

import Markdown from '../../lib/markdown';

import LazyImage from '../lazy-image';
import PrettyDate from '../pretty-date';

export default class Posts extends Component<{path, title}, {posts, next}> {

  public componentDidMount() {
    this.fetchPosts('/client/api/posts?a=6&p=0');
  }

  public render({ }, { posts = [] }) {
    return (
      <section class="posts">
        { posts.map((post, i) => ( <Post data={post} last={i === (posts.length - 1)} />)) }
        { this.state.next ?
          <div class="post">
            <button class="btn-load-more" onClick={this.loadMore}>Weitere laden</button>
          </div> : null }
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
    this.fetchPosts(`/client${this.state.next}`);
  }
}

const Post = ({ data, last }) => (
    <div class="row">
      <div class="col">
        <div class="post">
          <h3 class="post-title" id={encodeURI(data.title).toLowerCase()}>{data.title}</h3>
          <div class="post-body">
            <span class="post-date"><PrettyDate date={data.date} /></span>
            <div class="post-text">
              <Markdown markdown={data.body} />
            </div>
          </div>
        </div>
      </div>
      { data.images.length > 0 ?
      <div class="col">
        <div class="post-images">
          { data.images.map((image) => ( <LazyImage image={image} />))}
        </div>
      </div> : null }
      { last ? null : <div class="post-footer"></div> }
    </div>
);
