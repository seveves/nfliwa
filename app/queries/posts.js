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
