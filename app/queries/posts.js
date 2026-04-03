export const POSTS_QUERY = `
  query PostsPage {
    allPosts(orderBy: createdAt_DESC) {
      id
      title
      data {
        value
      }
      createdAt
      updatedAt
      images {
        responsiveImage(imgixParams: { fit: max, w: 600, h: 450, auto: format }) {
          src
          alt
          title
          base64
        }
      }
    }
  }
`;

export const SINGLE_POST_QUERY = `
  query SinglePost($id: ItemId!) {
    post(filter: { id: { eq: $id } }) {
      id
      title
      data {
        value
      }
      createdAt
      updatedAt
      images {
        responsiveImage(imgixParams: { fit: max, w: 600, h: 450, auto: format }) {
          src
          alt
          title
          base64
        }
      }
    }
  }
`;
