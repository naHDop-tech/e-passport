import {createEvent, createStore, createEffect, createApi} from "effector";

import {
    ICountriesStore,
    INationalitiesStore,
    ICommonResponseStore,
    IUserProfileStore, IUserPhotoStore
} from "@components/UserProfile/store/interface";
import {nationalitiesApi} from "@components/UserProfile/store/api/nationalities";
import {countriesApi} from "@components/UserProfile/store/api/countries";
import {updateUserProfileApi} from "@components/UserProfile/store/api/user-profile";
import {updateUserPhotoApi, uploadUserPhotoApi} from "@components/UserProfile/store/api/user-iamge";

export function createUserPhotoStoreDomain() {
    const uploadUserPhotoEvent = createEvent()
    const updateUserPhotoEvent = createEvent<string>()
    
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
        },
        effect: {
            uploadUserPhotoFx,
            updateUserPhotoFx,
        }
    }
}

export function createUserInfoDomain() {
    const updateUserProfile = createEvent()
    
    const userInfoStoreDefault: IUserProfileStore = {
        birthDate: "",
        firstName: "",
        lastName: "",
        nationality: "",
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
        setNationality: (cs, nationality: string) => ({ ...cs, nationality }),
        setSex: (cs, sex: string) => ({ ...cs, sex }),
        setBirthDay: (cs, birthDay: string) => ({ ...cs, birthDay }),
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
            updateUserProfile,
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
