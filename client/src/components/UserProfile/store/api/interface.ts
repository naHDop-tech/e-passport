export interface IUploadUserPhotoPayload {
    file: File,
    userId: string
}

export interface IUpdateUserPhotoPayload {
    file: File,
    userId: string
    photoId: string
}


export interface IUploadUserPhotoResponse {
    status: string
}