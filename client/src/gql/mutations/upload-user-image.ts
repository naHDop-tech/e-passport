import { gql } from '@apollo/client'

export const UPLOAD_USER_IMAGE = gql`
  mutation CreateUser ($createPhotoInput: CreatePhotoInput!) {
    uploadUserImage(createPhotoInput: $createPhotoInput) {
      id
      internalFile {
        filename
        mimetype
        encoding
      }
    }
  }
`
