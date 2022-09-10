import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { split, HttpLink, concat, ApolloLink, gql } from '@apollo/client';

import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

const typeDefs = gql`
  extend type Applicant {
    id: ID!
    email: String!
    password: String!
  }

  extend type CreateApplicantInput {
    email: String!
    password: String!
  }

  extend type JwtToken {
    token: String!
    userId: String!
  }

  extend type SignInInput {
    email: String!
    password: String!
  }

  extend type Mutation {
    createApplicant(createApplicantInput: CreateApplicantInput): Applicant
    signIn(signInInput: SignInInput): JwtToken
  }

  extend type Query {
    isApplicantExists(email: String): Boolean
  }
`;

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
      authorization: localStorage.getItem('token') || null,
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