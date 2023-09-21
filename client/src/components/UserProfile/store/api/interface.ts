import { IUserProfileStore } from "@components/UserProfile/store/interface";

export interface IUploadUserPhotoPayload {
    file: File,
    userId: string
}

export interface IUpdateUserPhotoPayload {
    file: File,
    userId: string
    photoId: string
}

export interface ICreateUserPhonePayload {
    userId: string
    country_code: string
    number: string
}

export interface IUpdateUserPhonePayload {
    userId: string
    country_code: string
    number: string
    phone_id: string
}

export interface ICommonResponse {
    status: string
}

export interface IUpdateUserProfilePayload extends IUserProfileStore {
    userId: string
}
