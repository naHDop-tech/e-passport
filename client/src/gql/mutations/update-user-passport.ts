import { gql } from '@apollo/client'

export const UPDATE_USER_PASSPORT = gql`
    mutation UpdateUserPassport($updatePassportInput: UpdatePassportInput) {
        updateUserPassport (updatePassportInput: $updatePassportInput) {
            countryCode
            placeOfBirth
            fingerprint {
                publicKey
            }
        }
    }
`
