import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { split, HttpLink, concat, ApolloLink, gql } from '@apollo/client';

import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

const typeDefs = gql`
  extend type User {
    id: ID!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    birthDate: String!
    createdAt: String!
    updatedAt: String
    countryResident: String!
    age: Int!
    isVerified: Boolean!
  }

  extend type CreateUserInput {
    email: String!
    firstName: String!
    lastName: String!
    birthDate: String!
    countryResident: String!
  }

  extend type DeleteUserInput {
    id: ID!
  }

  extend type UpdateUserInput {
    email: String
    firstName: String
    lastName: String
    birthDate: String
    countryResident: String
    isVerified: Boolean
  }

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
    createUser(createUserInput: CreateUserInput): User
    updateUser(updateUserInput: UpdateUserInput): User
  }

  extend type Query {
    user: User
    applicant: Applicant
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