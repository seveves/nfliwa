import { Component, h } from 'preact';
import * as Markup from 'preact-markup';
import * as StructuredTextUtils from 'datocms-structured-text-to-html-string';
import { request } from '../../lib/datocms';

import './style.scss';

import PrettyDate from '../pretty-date';
import LazyImage from '../lazy-image';

import { POSTS_QUERY } from '../../queries/posts';

export default class Posts extends Component {
  componentDidMount() {
    request({
      query: POSTS_QUERY,
    }).then((data) => {
      this.setState({ posts: data.allPosts });
    });
  }

  render({}, { posts = [] }) {
    return (
      <section class="posts">
        {posts.map((post, i) => (
          <Post data={post} key={i} />
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
            <PrettyDate date={data.createdAt} />
          </span>
          <div class="post-text">
            <Markup markup={StructuredTextUtils.render(data.data.value.document)} type="html" />
          </div>
        </div>
      </div>
    </div>
    {data.images.length > 0 ? (
      <div class="col">
        <div class="post-images">
          {data.images.map((image, i) => (
            <LazyImage image={image.responsiveImage} key={i} />
          ))}
        </div>
      </div>
    ) : null}
  </div>
);
