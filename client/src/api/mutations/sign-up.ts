import { gql } from '@apollo/client'

export const SIGN_UP = gql`
  mutation CreateApplicant ($createApplicantInput: CreateApplicantInput) {
    createApplicant(createApplicantInput: $createApplicantInput) {
      id
      email
    }
  }
`
