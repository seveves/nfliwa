import { Component, h } from 'preact';
import * as Markup from 'preact-markup';

import './style.scss';

import PrettyDate from '../pretty-date';
import LazyImage from '../lazy-image';

export default class Posts extends Component {
  fetchPosts(apiUrl) {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((json) => json || [])
      .then((result) => {
        const posts = this.state.posts || [];
        this.setState({ posts: posts.concat(result.posts), next: result.next });
      });
  }

  componentDidMount() {
    this.fetchPosts('/client/api/posts?a=6&p=0');
  }

  render({}, { posts = [] }) {
    return (
      <section class="posts">
        {posts.map((post, i) => (
          <Post data={post} />
        ))}
      </section>
    );
  }
}

const Post = ({ data }) => (
  <div class="row">
    <div class="col">
      <div class="post">
        <h3 class="post-title" id={encodeURI(data.title).toLowerCase()}>
          {data.title}
        </h3>
        <div class="post-body">
          <span class="post-date">
            <PrettyDate date={data.date} />
          </span>
          <div class="post-text">
            <Markup markup={data.body} type="html" />
          </div>
        </div>
      </div>
    </div>
    {data.images.length > 0 ? (
      <div class="col">
        <div class="post-images">
          {data.images.map((image) => (
            <LazyImage image={image} />
          ))}
        </div>
      </div>
    ) : null}
  </div>
);
