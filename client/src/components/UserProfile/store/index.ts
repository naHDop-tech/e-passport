import { sample } from "effector";

import {
    createNationalitiesAndCountriesDomain,
    createUserInfoDomain,
    createUserPhotoStoreDomain
} from "@components/UserProfile/store/init";

export const countriesAndNationalitiesDomain = createNationalitiesAndCountriesDomain()
export const userProfileStoreDomain = createUserInfoDomain()
export const userPhotoStoreDomain = createUserPhotoStoreDomain()

// USER PHOTO
sample({
    clock: userPhotoStoreDomain.event.updateUserPhotoEvent,
    target: userPhotoStoreDomain.effect.updateUserPhotoFx,
    fn: (store, photoId) => {
        userPhotoStoreDomain.api.responseStoreApi.reset()
        const userId = localStorage.getItem('userId')
        if (userId && store.file) {
            return {
                userId,
                file: store.file,
                photoId,
            }
        } else {
            throw new Error("No user Id or file")
        }
    },
    source: userPhotoStoreDomain.store.$fileStore,
})
sample({
    clock: userPhotoStoreDomain.event.uploadUserPhotoEvent,
    target: userPhotoStoreDomain.effect.uploadUserPhotoFx,
    fn: (store) => {
        userPhotoStoreDomain.api.responseStoreApi.reset()
        const userId = localStorage.getItem('userId')
        if (userId && store.file) {
            return {
                userId,
                file: store.file,
            }
        } else {
            throw new Error("No user Id or file")
        }
    },
    source: userPhotoStoreDomain.store.$fileStore,
})
userPhotoStoreDomain.store.$responseStore.on(userPhotoStoreDomain.effect.uploadUserPhotoFx.failData, (cs, error: any) =>
    ({ ...cs, serverError: error.data.error.message })
)
userPhotoStoreDomain.store.$responseStore.on(userPhotoStoreDomain.effect.updateUserPhotoFx.failData, (cs, error: any) =>
    ({ ...cs, serverError: error.data.error.message })
)
userPhotoStoreDomain.store.$responseStore.on(userPhotoStoreDomain.effect.uploadUserPhotoFx.doneData, (cs, data) => {
    if (data.data) {
        userPhotoStoreDomain.api.fileStoreApi.reset()
        return { ...cs, status: data.data.status }
    }
    return cs
})
userPhotoStoreDomain.store.$responseStore.on(userPhotoStoreDomain.effect.updateUserPhotoFx.doneData, (cs, data) => {
    if (data.data) {
        userPhotoStoreDomain.api.fileStoreApi.reset()
        return { ...cs, status: data.data.status }
    }
    return cs
})

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
            return ({ ...cs, nationalities: data.data});
        }
        return cs
    }
)
countriesAndNationalitiesDomain.store.$countriesStore.on(
    countriesAndNationalitiesDomain.effect.getCountriesFx.doneData, (cs, data) => {
        if (data.data) {
            return ({ ...cs, countries: data.data});
        }
        return cs
    }
)

// USER PRFILE
sample({
    clock: userProfileStoreDomain.event.updateUserProfile,
    target: userProfileStoreDomain.effect.updateUserProfileFx,
    fn: (store) => {
        userProfileStoreDomain.api.userProfileResponseStoreApi.reset()
        const userId = localStorage.getItem('userId')
        if (userId) {
            return {
                userId,
                ...store
            }
        } else {
            throw new Error('No user Id')
        }
    },
    source: userProfileStoreDomain.store.$userProfileStore,
})

userProfileStoreDomain.store.$userProfileResponseStore.on(
    userProfileStoreDomain.effect.updateUserProfileFx.failData, (cs, error: any) => 
        ({ ...cs, serverError: error.data.error.message })
)
userProfileStoreDomain.store.$userProfileResponseStore.on(
    userProfileStoreDomain.effect.updateUserProfileFx.doneData, (cs, data) => {
        if (data.data) {
            userProfileStoreDomain.api.userProfileStoreApi.reset()
            return { ...cs, status: data.data.status }
        }
        return cs
    }
)