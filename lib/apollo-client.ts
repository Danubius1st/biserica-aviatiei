'use client';

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache
} from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { createGraphqlLogLink } from '@/lib/graphql-log-link';

const httpLink = new HttpLink({
  uri: '/api/graphql',
});

const ssrMode = typeof window === 'undefined';
const authLink = new SetContextLink(async ({ headers }) => {
  const accessToken = ssrMode
    ? 'null'
    : localStorage.getItem('auth-token');

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    }
  };
});

const link: ApolloLink = ApolloLink.from([
  ...(process.env.NODE_ENV === 'development'
    ? [createGraphqlLogLink()]
    : []),
  authLink,
  httpLink,
]);

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  ssrMode,
});

// https://www.apollographql.com/docs/react/networking/authentication
// https://www.apollographql.com/docs/react/networking/authentication#header
