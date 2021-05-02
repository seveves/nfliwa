import { GraphQLClient } from 'graphql-request';

export async function request({ query, variables, preview }) {
  const endpoint = preview ? `https://graphql.datocms.com/preview` : `https://graphql.datocms.com/`;
  const res = await fetch('/api/environment');
  const environment = await res.json();
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${environment.datocms}`,
    },
  });
  return client.request(query, variables);
}
