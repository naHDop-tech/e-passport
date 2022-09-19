import { gql } from '@apollo/client'

export const GET_APPLICANT = gql`
  query Applicant {
    applicant {
      id
      email
    }
  }
`
