import { AxiosResponse } from "axios";

import {
    ICommonResponse,
    ICreateUserPhonePayload,
    IUpdateUserPhonePayload,
} from "@components/UserProfile/store/api/interface";
import { GenericMSResponse } from "@root/clients/api/interface";
import { apiClient } from "@root/clients/api";
import { IUserPhoneStore } from "@components/UserProfile/store/interface";

export const createUserPhoneApi = async (
    payload: ICreateUserPhonePayload
): Promise<GenericMSResponse<ICommonResponse>> => {
    const { userId, ...params } = payload
    const { data } = await apiClient.post<IUserPhoneStore, AxiosResponse<GenericMSResponse<ICommonResponse>>>(
        `/v1/user/${userId}/phone`,
        params,
    )
    return data
}

export const updateUserPhoneApi = async (
    payload: IUpdateUserPhonePayload
): Promise<GenericMSResponse<ICommonResponse>> => {
    const { userId, phone_id, ...params } = payload
    const { data } = await apiClient.patch<IUserPhoneStore, AxiosResponse<GenericMSResponse<ICommonResponse>>>(
        `/v1/user/${userId}/phone/${phone_id}`,
        params
    )
    return data
}