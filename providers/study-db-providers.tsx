'use client';

import React from 'react';
import { apolloClient } from '@/lib/apollo-client';
import { ApolloProvider/*, gql*/ } from '@apollo/client/react';

interface Props {
  children: React.ReactNode;
}

export const StudyDbProviders = ({ children }: Props) => {
  // const query = gql`
  //   query GetData {
  //     BibleBooks {
  //       id
  //       book
  //       abbrev
  //     }
  //   }
  // `;
  // console.log('StudyDbProviders (query):\n', apolloClient.cache.readQuery({ query }));

  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  );
};
