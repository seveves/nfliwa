export const STATICS_QUERY = `
  query StaticsPage($id: String) {
    static(filter: {pageid: {eq: $id}}) {
      id
      pageid
      data {
        value
      }
    }
  }
`;
