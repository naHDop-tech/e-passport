import { gql } from "@apollo/client";

export const typeDefs = gql`
  extend type FileInput {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  extend type Photo {
    id: ID!
    filename: String!
    mimetype: String!
    encoding: String!
    createdAt: String!
    updatedAt: String
    isDeleted: Boolean
  }

  extend type MarkAsDeletePhotoInput {
    id: ID!
  }

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
    photo: Photo
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
    uploadUserImage(createPhotoInput: FileInput): Photo
  }

  extend type Query {
    user: User
    applicant: Applicant
    isApplicantExists(email: String): Boolean
  }
`;