import { AxiosResponse } from "axios";

import { ILoginResponse, ILoginPayload } from "@components/SignIn/store/api/interface";
import { GenericMSResponse } from "@root/clients/api/interface";
import { apiClient } from "@root/clients/api";

export const loginApi = async (payload: ILoginPayload): Promise<GenericMSResponse<ILoginResponse>> => {
    const { data } = await apiClient.post<ILoginPayload, AxiosResponse<GenericMSResponse<ILoginResponse>>>(
        "/v1/login",
        payload
    )
    return data
}