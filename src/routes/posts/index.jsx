import { Component, h } from 'preact';
import Markup from 'preact-markup';
import * as StructuredText from 'datocms-structured-text-to-html-string';
import { request } from '../../lib/datocms';

import styles from './style.css';

import PrettyDate from '../../components/pretty-date';
import LazyImage from '../../components/lazy-image';

import { POSTS_QUERY } from '../../queries/posts';

const structuredText = {
  "type": "root",
  "children": [
    { 
      "type": "heading", 
      "level": 1, 
      "children": [
        {
          "type": "span",
          "marks": [],
          "value": "This is a title!"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "span",
          "value": "This is a "
        },
        {
          "type": "span",
          "marks": ["strong"],
          "value": "paragraph!"
        }
      ]
    },
    {
      "type": "list",
      "style": "bulleted",
      "children": [
        {
          "type": "listItem",
		 "children": [
			 {
            "type": "paragraph",
            "children": [
              {
                "type": "span",
                "value": "And this is a list!"
              }
            ]
          },
		 ]
          
        }
      ]
    }
  ]
};

const Post = ({ data }) => (
  <div class="row">
    <div class="col">
      <div className={styles.post}>
        <h3 className={styles.postTitle} id={encodeURI(data.title).toLowerCase()}>
          {data.title}
        </h3>
        <div className={styles.postBody}>
          <span className={styles.postDate}>
            <PrettyDate date={data.createdAt} />
          </span>
          <div class="post-text">
            <Markup markup={StructuredText.render(structuredText)} type="html" />
          </div>
        </div>
      </div>
    </div>
    {data.images.length > 0 ? (
      <div class="col">
        <div className={styles.postImages}>
          {data.images.map((image, i) => (
            <LazyImage image={image.responsiveImage} key={i} />
          ))}
        </div>
      </div>
    ) : null}
  </div>
);

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
      <section className={styles.posts}>
        {posts.map((post, i) => (
          <Post data={post} key={i} />
        ))}
      </section>
    );
  }
}
