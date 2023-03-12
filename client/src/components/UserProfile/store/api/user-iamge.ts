import {AxiosResponse} from "axios";

import {GenericMSResponse} from "@root/clients/api/interface";
import {apiClient} from "@root/clients/api";
import {
    IUpdateUserPhotoPayload,
    IUploadUserPhotoPayload,
    IUploadUserPhotoResponse
} from "@components/UserProfile/store/api/interface";

export const uploadUserPhotoApi = async (
    payload: IUploadUserPhotoPayload
): Promise<GenericMSResponse<IUploadUserPhotoResponse>> => {
    const form = new FormData();
    form.set('file', payload.file)
    const { data } = await apiClient.post<FormData, AxiosResponse<GenericMSResponse<IUploadUserPhotoResponse>>>(
        `/v1/user/${payload.userId}/photo`,
        form,
        { withCredentials: false, headers: { 'Content-Type': 'multipart/form-data' } }
    )
    return data
}

export const updateUserPhotoApi = async (
    payload: IUpdateUserPhotoPayload
): Promise<GenericMSResponse<IUploadUserPhotoResponse>> => {
    const form = new FormData();
    form.set('file', payload.file)
    const { data } = await apiClient.patch<FormData, AxiosResponse<GenericMSResponse<IUploadUserPhotoResponse>>>(
        `/v1/user/${payload.userId}/photo/${payload.photoId}`,
        form,
        { withCredentials: false, headers: { 'Content-Type': 'multipart/form-data' } }
    )
    return data
}