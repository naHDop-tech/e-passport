import { gql } from '@apollo/client'

export const UPDATE_USER_PHONE = gql`
  mutation UpdateUserPhone ($updateUserPhone: PhoneInput) {
    updateUserPhone(updateUserPhone: $updateUserPhone) {
      id
      countryCode
      number
      createdAt
      updatedAt
    }
  }
`
