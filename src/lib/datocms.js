import { GraphQLClient } from 'graphql-request';

export async function request({ query, variables, preview }) {
  const endpoint = preview ? `https://graphql.datocms.com/preview` : `https://graphql.datocms.com/`;
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
    },
  });
  return client.request(query, variables);
}
