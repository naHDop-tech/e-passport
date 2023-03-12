import {createEvent, createStore, createEffect, createApi} from "effector";

import {ICountriesStore, INationalitiesStore, IUserProfileStore} from "@components/UserProfile/store/interface";
import {nationalitiesApi} from "@components/UserProfile/store/api/nationalities";
import {countriesApi} from "@components/UserProfile/store/api/countries";
import {updateUserProfileApi} from "@components/UserProfile/store/api/user-profile";

export function createUserInfoDomain() {
    const updateUserProfile = createEvent()
    
    const userInfoStoreDefault: IUserProfileStore = {
        birthDate: "",
        firstName: "",
        lastName: "",
        nationality: "",
        sex: ""
    }
    
    const updateUserProfileFx = createEffect(updateUserProfileApi)
    
    const $userProfileStore = createStore<IUserProfileStore>(userInfoStoreDefault)
    
    const userProfileStoreApi = createApi($userProfileStore, {
        setFirstName: (cs, firstName: string) => ({ ...cs, firstName }),
        setLastName: (cs, lastName: string) => ({ ...cs, lastName }),
        setNationality: (cs, nationality: string) => ({ ...cs, nationality }),
        setSex: (cs, sex: string) => ({ ...cs, sex }),
        setBirthDay: (cs, birthDay: string) => ({ ...cs, birthDay }),
        resetData: () => userInfoStoreDefault,
        resetError: (cs) => ({ ...cs, serverError: undefined })
    })
    
    return {
        api: {
            userProfileStoreApi
        },
        store: {
            $userProfileStore,
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
