import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation CreateUser ($createUserInput: CreateUserInput) {
    createUser(createUserInput: $createUserInput) {
      token
      id
      email
      firstName
      lastName
      birthDate
      createdAt
      updatedAt
      countryResident
      age
      isVerified
    }
  }
`
