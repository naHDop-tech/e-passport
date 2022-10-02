import { gql } from '@apollo/client'

export const UPDATE_USER_PHONE = gql`
  mutation UpdateUserPhone ($updateUserPhoneInput: PhoneInput) {
    updateUserPhone(updateUserPhoneInput: $updateUserPhoneInput) {
      id
      countryCode
      number
      createdAt
      updatedAt
    }
  }
`
