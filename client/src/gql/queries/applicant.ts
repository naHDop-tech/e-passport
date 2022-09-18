import { gql } from '@apollo/client'

export const GET_APPLICANT = gql`
  query Applicant ($id: ID!) {
    applicant(id: $id) {
      id
      email
    }
  }
`
