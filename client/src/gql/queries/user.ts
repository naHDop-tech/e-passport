import { gql } from '@apollo/client'

export const GET_USER = gql`
  query User {
    user {
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
      photo {
        id
        filename
        mimetype
        encoding
        createdAt
        updatedAt
        isDeleted
      }
    }
  }
`
