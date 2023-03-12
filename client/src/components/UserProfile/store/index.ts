import { sample } from "effector";

import { createNationalitiesAndCountriesDomain, createUserInfoDomain } from "@components/UserProfile/store/init";

export const countriesAndNationalitiesDomain = createNationalitiesAndCountriesDomain()
export const userProfileStoreDomain = createUserInfoDomain()

// NATIONALITIES AND COUNTRIES
sample({
    clock: countriesAndNationalitiesDomain.event.getNationalitiesEvent,
    target: countriesAndNationalitiesDomain.effect.getNationalitiesFx
})
sample({
    clock: countriesAndNationalitiesDomain.event.getCountriesEvent,
    target: countriesAndNationalitiesDomain.effect.getCountriesFx
})

countriesAndNationalitiesDomain.store.$nationalitiesStore.on(
    countriesAndNationalitiesDomain.effect.getNationalitiesFx.failData, (cs, error: any) => 
        ({ ...cs, serverError: error.data.error.message })
)
countriesAndNationalitiesDomain.store.$countriesStore.on(
    countriesAndNationalitiesDomain.effect.getCountriesFx.failData, (cs, error: any) => 
        ({ ...cs, serverError: error.data.error.message })
)

countriesAndNationalitiesDomain.store.$nationalitiesStore.on(
    countriesAndNationalitiesDomain.effect.getNationalitiesFx.doneData, (cs, data) => {
        if (data.data) {
            return ({...cs, nationalities: data.data});
        }
        return cs
    }
)
countriesAndNationalitiesDomain.store.$countriesStore.on(
    countriesAndNationalitiesDomain.effect.getCountriesFx.doneData, (cs, data) => {
        if (data.data) {
            return ({...cs, countries: data.data});
        }
        return cs
    }
)

// USER PRFILE
sample({
    clock: userProfileStoreDomain.event.updateUserProfile,
    target: userProfileStoreDomain.effect.updateUserProfileFx,
    fn: (store) => {
        const userId = localStorage.getItem('userId')
        if (userId) {
            return {
                userId,
                firstName: store.firstName,
                lastName: store.lastName,
                birthDate: store.birthDate,
                nationality: store.nationality,
                sex: store.sex,
            }
        } else {
            throw new Error('No user Id')
        }
    },
    source: userProfileStoreDomain.store.$userProfileStore,
})

userProfileStoreDomain.store.$userProfileStore.on(
    userProfileStoreDomain.effect.updateUserProfileFx.failData, (cs, error: any) => 
        ({ ...cs, serverError: error.data.error.message })
)
userProfileStoreDomain.store.$userProfileStore.on(
    userProfileStoreDomain.effect.updateUserProfileFx.doneData, (cs, data) => {
        if (data.data) {
            return { ...cs, status: data.data.status }
        }
        return cs
    }
)