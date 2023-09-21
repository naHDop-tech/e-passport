import { AxiosResponse } from "axios";

import { ISignUpPayload, ISignUpResponse } from "@components/SignUp/store/api/interface";
import { GenericMSResponse } from "@root/clients/api/interface";
import { apiClient } from "@root/clients/api";

export const signUpApi = async (payload: ISignUpPayload): Promise<GenericMSResponse<ISignUpResponse>> => {
    const { data } = await apiClient.post<ISignUpPayload, AxiosResponse<GenericMSResponse<ISignUpResponse>>>(
        "/v1/user", payload
    )
    return data
}