import {createEvent, createStore, createEffect, createApi} from "effector";

import {
    ICountriesStore,
    INationalitiesStore,
    ICommonResponseStore,
    IUserProfileStore, IUserPhotoStore, IFullUserInfo
} from "@components/UserProfile/store/interface";
import {nationalitiesApi} from "@components/UserProfile/store/api/nationalities";
import {countriesApi} from "@components/UserProfile/store/api/countries";
import {getUserProfileApi, updateUserProfileApi} from "@components/UserProfile/store/api/user-profile";
import {updateUserPhotoApi, uploadUserPhotoApi} from "@components/UserProfile/store/api/user-iamge";

export function createUserInfoDomain() {
    const getUserInfoEvent = createEvent()
    const resetResponse = createEvent()
    const resetStore = createEvent()

    const userInfoDefault: IFullUserInfo = {}
    const userInfoResponseDefault: ICommonResponseStore = {
        serverError: "",
        status: "",
    }

    const getUserInfoFx = createEffect(getUserProfileApi)

    const $userInfo = createStore<IFullUserInfo>(userInfoDefault)
    const $userInfoResponse = createStore<ICommonResponseStore>(userInfoResponseDefault)
    
    const userInfoResponseApi = createApi($userInfoResponse, {
        reset: () => userInfoResponseDefault
    })

    return {
        api: {
            userInfoResponseApi
        },
        store: {
            $userInfoResponse,
            $userInfo,
        },
        event: {
            getUserInfoEvent,
            resetResponse,
            resetStore,
        },
        effect: {
            getUserInfoFx
        }
    }
}

export function createUserPhotoStoreDomain() {
    const uploadUserPhotoEvent = createEvent()
    const updateUserPhotoEvent = createEvent<string>()
    const fileStoreReset = createEvent()
    const fileStoreResponseReset = createEvent()
    
    const userPhotoStoreDefault: IUserPhotoStore = {}
    const userPhotoResponseStore: ICommonResponseStore = {
        serverError: "",
        status: "",
    }
    
    const uploadUserPhotoFx = createEffect(uploadUserPhotoApi)
    const updateUserPhotoFx = createEffect(updateUserPhotoApi)
    
    const $fileStore = createStore<IUserPhotoStore>(userPhotoStoreDefault)
    const $responseStore = createStore<ICommonResponseStore>(userPhotoResponseStore)
    
    const fileStoreApi = createApi($fileStore, {
        setFile: (cs, file: File) => ({ ...cs, file }),
        reset: () => userPhotoStoreDefault,
    })
    const responseStoreApi = createApi($responseStore, {
        reset: () => userPhotoResponseStore
    })
    
    return {
        api: {
            fileStoreApi,
            responseStoreApi,
        },
        store: {
            $fileStore,
            $responseStore,
        },
        event: {
            uploadUserPhotoEvent,
            updateUserPhotoEvent,
            fileStoreReset,
            fileStoreResponseReset,
        },
        effect: {
            uploadUserPhotoFx,
            updateUserPhotoFx,
        }
    }
}

export function createUserInfoStoreDomain() {
    const updateUserProfileEvent = createEvent()
    const userProfileStoreResetEvent = createEvent()
    const userProfileResponseResetEvent = createEvent()
    
    const userInfoStoreDefault: IUserProfileStore = {
        birthDate: "",
        firstName: "",
        lastName: "",
        nationality: 0,
        sex: ""
    }
    const userProfileResponseStoreDefault: ICommonResponseStore = {
        serverError: "",
        status: "",
    }
    
    const updateUserProfileFx = createEffect(updateUserProfileApi)
    
    const $userProfileStore = createStore<IUserProfileStore>(userInfoStoreDefault)
    const $userProfileResponseStore = createStore<ICommonResponseStore>(userProfileResponseStoreDefault)

    const userProfileStoreApi = createApi($userProfileStore, {
        setFirstName: (cs, firstName: string) => ({ ...cs, firstName }),
        setLastName: (cs, lastName: string) => ({ ...cs, lastName }),
        setNationality: (cs, nationality: number) => ({ ...cs, nationality }),
        setSex: (cs, sex: string) => ({ ...cs, sex }),
        setBirthDay: (cs, birthDate: string) => ({ ...cs, birthDate }),
        setDefaultValues: (cs, profile: IUserProfileStore) => profile,
        reset: () => userInfoStoreDefault,
    })
    const userProfileResponseStoreApi = createApi($userProfileResponseStore, {
        reset: () => userProfileResponseStoreDefault
    })
    
    return {
        api: {
            userProfileStoreApi,
            userProfileResponseStoreApi,
        },
        store: {
            $userProfileStore,
            $userProfileResponseStore
        },
        event: {
            updateUserProfileEvent,
            userProfileResponseResetEvent,
            userProfileStoreResetEvent
        },
        effect: {
            updateUserProfileFx
        }
    }
}

export function createNationalitiesAndCountriesDomain() {
    const getNationalitiesEvent = createEvent()
    const getCountriesEvent = createEvent()
    
    const nationalitiesStoreDefault: INationalitiesStore = {
        nationalities: []
    }
    const countriesStoreDefault: ICountriesStore = {
        countries: []
    }
    
    const getNationalitiesFx = createEffect(nationalitiesApi)
    const getCountriesFx = createEffect(countriesApi)
    
    const $nationalitiesStore = createStore<INationalitiesStore>(nationalitiesStoreDefault)
    const $countriesStore = createStore<ICountriesStore>(countriesStoreDefault)
    
    return {
        event: {
            getCountriesEvent,
            getNationalitiesEvent,
        },
        effect: {
            getCountriesFx,
            getNationalitiesFx,
        },
        store: {
            $nationalitiesStore,
            $countriesStore,
        }
    }
}
