export const STATICS_QUERY = `
  query StaticsPage($pageid: String) {
    static(filter: {pageid: {eq: $pageid}}) {
      id
      title
      pageid
      data {
        value
      }
      image {
        responsiveImage {
          src
          alt
          title
          base64
        }
      }
      gallery {
        responsiveImage {
          src
          alt
          title
          base64
        }
      }
    }
  }
`;
