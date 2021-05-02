export const POSTS_QUERY = `
  query PostsPage {
    allPosts {
      id
      title
      data {
        value
      }
      createdAt
      updatedAt
      images {
        responsiveImage(imgixParams: { fit: crop, w: 300, h: 300, auto: format }) {
          src
          alt
          title
          base64
        }
      }
    }
  }
`;
