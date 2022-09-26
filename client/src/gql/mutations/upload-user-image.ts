import { gql } from '@apollo/client'

export const UPLOAD_USER_IMAGE = gql`
  mutation UploadUserPhoto ($createPhotoInput: FileInput) {
    uploadUserImage(createPhotoInput: $createPhotoInput) {
      id
      filename
      mimetype
      encoding
      createdAt
      updatedAt
      isDeleted
    }
  }
`
