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
      nationality
      sex
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
      phone {
        id
        number
        countryCode
      }
      address {
        id
        country
        city
        line1
        line2
        zip
        createdAt
        updatedAt
      }
      passport {
        id
        mrzL1
        mrzL2
        uNumber
        pNumber
        issuingOrganization
        countryCode
        issueDate
        expirationDate
        type
        placeOfBirth
        fingerprint {
          publicKey
        }
      }
    }
  }
`
