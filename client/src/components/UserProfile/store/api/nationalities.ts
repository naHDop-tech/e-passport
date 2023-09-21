import { AxiosResponse } from "axios";

import { GenericMSResponse } from "@root/clients/api/interface";
import { apiClient } from "@root/clients/api";
import { INationality } from "@components/UserProfile/store/interface";

export const nationalitiesApi = async (): Promise<GenericMSResponse<INationality[]>> => {
    const { data } = await apiClient.get<null, AxiosResponse<GenericMSResponse<INationality[]>>>(
        "/v1/nationalities", { withCredentials: false }
    )
    return data
}