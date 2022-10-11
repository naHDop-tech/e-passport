import { gql } from '@apollo/client'

export const UPDATE_USER_ADDRESS = gql`
  mutation UpdateUserAddress ($updateAddressInput: AddressInput) {
    updateUserAddress(updateAddressInput: $updateAddressInput) {
      id
      country
      city
      line1
      line2
      zip
      createdAt
      updatedAt
    }
  }
`
