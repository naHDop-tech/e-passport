import { AxiosResponse } from "axios";

import { ICommonResponse, IUpdateUserProfilePayload } from "@components/UserProfile/store/api/interface";
import { GenericMSResponse } from "@root/clients/api/interface";
import { apiClient } from "@root/clients/api";
import { IFullUserInfo, IUserProfileStore } from "@components/UserProfile/store/interface";

export const updateUserProfileApi = async (
    payload: IUpdateUserProfilePayload
): Promise<GenericMSResponse<ICommonResponse>> => {
    const { userId, serverError,  ...params } = payload
    const { data } = await apiClient.patch<IUserProfileStore, AxiosResponse<GenericMSResponse<ICommonResponse>>>(
        `/v1/user/${payload.userId}`,
        params,
    )
    return data
}

export const getUserDataApi = async (
    userId: string
): Promise<GenericMSResponse<IFullUserInfo>> => {
    const { data } = await apiClient.get<null, AxiosResponse<GenericMSResponse<IFullUserInfo>>>(
        `/v1/user/${userId}`
    )
    return data
}