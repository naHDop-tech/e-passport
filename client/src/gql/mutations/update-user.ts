import { gql } from '@apollo/client'

export const UPDATE_USER = gql`
  mutation UpdateUser ($updateUserInput: UpdateUserInput) {
    updateUser(updateUserInput: $updateUserInput) {
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
    }
  }
`
