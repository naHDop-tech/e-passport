import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { split, HttpLink, concat, ApolloLink } from '@apollo/client';

import { typeDefs } from './typeDefs'
import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: 'http://localhost:5005/graphql'
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:5005/subscription',
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem('token')?.replace(/"/g, '') || null,
    }
  }));

  return forward(operation);
})

export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, splitLink),
  cache: new InMemoryCache({
    addTypename: false
  }),
  typeDefs,
});