export const STATICS_QUERY = `
  query StaticsPage($pageid: String) {
    static(filter: {pageid: {eq: $pageid}}) {
      id
      pageid
      data {
        value
      }
    }
  }
`;
