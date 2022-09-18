import { gql } from '@apollo/client'

export const GET_USER = gql`
  query User ($id: ID!) {
    user(id: $id) {
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
