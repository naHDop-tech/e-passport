import { AxiosResponse } from "axios";

import { GenericMSResponse} from "@root/clients/api/interface";
import { ICountry } from "@components/UserProfile/store/interface";
import { apiClient } from "@root/clients/api";

export const countriesApi = async (): Promise<GenericMSResponse<ICountry[]>> => {
    const { data } = await apiClient.get<null, AxiosResponse<GenericMSResponse<ICountry[]>>>(
        "/v1/countries", { withCredentials: false }
    )
    return data
}