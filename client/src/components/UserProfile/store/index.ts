import { sample } from "effector";

import {
    createNationalitiesAndCountriesDomain,
    createUserInfoDomain,
    createUserInfoStoreDomain, createUserPhoneDomain,
    createUserPhotoStoreDomain
} from "@components/UserProfile/store/init";

export const countriesAndNationalitiesDomain = createNationalitiesAndCountriesDomain()
export const userProfileStoreDomain = createUserInfoStoreDomain()
export const userPhotoStoreDomain = createUserPhotoStoreDomain()
export const userInfoDomain = createUserInfoDomain()
export const userPhoneDomain = createUserPhoneDomain()

//USER PHONE
sample({
    clock: userPhoneDomain.effect.createUserPhoneFx.doneData,
    target: userPhoneDomain.event.storeResetEvent,
})
sample({
    clock: userPhoneDomain.effect.updateUserPhoneFx.doneData,
    target: userPhoneDomain.event.storeResetEvent,
})
sample({
    clock: userPhoneDomain.event.createUserPhoneEvent,
    target: userPhoneDomain.event.responseResetEvent,
})
sample({
    clock: userPhoneDomain.event.updateUserPhoneEvent,
    target: userPhoneDomain.event.responseResetEvent,
})
sample({
    clock: userPhoneDomain.event.createUserPhoneEvent,
    target: userPhoneDomain.effect.createUserPhoneFx,
    fn: (store) => {
        const userId = localStorage.getItem('userId')
        if (userId) {
            return {
                userId,
                country_code: store.country_code,
                number: store.number,
            }
        } else {
            throw new Error("No user id")
        }
    },
    source: userPhoneDomain.store.$form,
})
sample({
    clock: userPhoneDomain.event.updateUserPhoneEvent,
    target: userPhoneDomain.effect.updateUserPhoneFx,
    fn: ({ ups, uis }) => {
        const userId = localStorage.getItem('userId')
        if (userId) {
            if (!uis?.phone) {
                throw new Error("No user phone id")
            }
            return {
                userId,
                country_code: ups.country_code,
                number: ups.number,
                phone_id: uis.phone.phone_id,
            }
        } else {
            throw new Error("No user id")
        }
    },
    source: { ups: userPhoneDomain.store.$form, uis: userInfoDomain.store.$userInfo },
})
userPhoneDomain.store.$response.on(userPhoneDomain.effect.createUserPhoneFx.failData, (_, error: any) =>
    ({ status: "failed", serverError: error.data.error.message})).reset(userPhoneDomain.event.responseResetEvent)
userPhoneDomain.store.$response.on(userPhoneDomain.effect.createUserPhoneFx.doneData, () =>
    ({ status: "ok", serverError: "" })).reset(userPhoneDomain.event.responseResetEvent)
//USER INFO
sample({
    clock: userInfoDomain.event.getUserInfoEvent,
    target: userInfoDomain.effect.getUserInfoFx,
    fn: () => {
        const userId = localStorage.getItem('userId')
        if (userId) {
            return userId
        } else {
            throw new Error("No user id")
        }
    }
})

sample({
    clock: userInfoDomain.effect.getUserInfoFx.doneData,
    target: userInfoDomain.event.resetResponse
})

sample({
    clock: userInfoDomain.event.getUserInfoEvent,
    target: userInfoDomain.event.resetResponse
})

userInfoDomain.store.$userInfo.on(userInfoDomain.effect.getUserInfoFx.doneData, (_, data) => {
    if (data.data) {
        return data.data
    }
})
userInfoDomain.store.$userInfoResponse.on(userInfoDomain.effect.getUserInfoFx.failData, (_, error: any) => 
    ({ status: "failed", serverError: error.data.error.message})).reset(userInfoDomain.event.resetResponse)
userInfoDomain.store.$userInfoResponse.on(userInfoDomain.effect.getUserInfoFx.doneData, () => {
    return {
        serverError: "",
        status: "ok"
    }
})

// USER PHOTO
sample({
    clock: userPhotoStoreDomain.event.updateUserPhotoEvent,
    target: userPhotoStoreDomain.effect.updateUserPhotoFx,
    fn: (store, photoId) => {
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
sample({
    clock: userPhotoStoreDomain.event.uploadUserPhotoEvent,
    target: userPhotoStoreDomain.event.fileStoreResponseReset
})
sample({
    clock: userPhotoStoreDomain.event.updateUserPhotoEvent,
    target: userPhotoStoreDomain.event.fileStoreResponseReset
})
userPhotoStoreDomain.store.$responseStore.on(userPhotoStoreDomain.effect.uploadUserPhotoFx.failData, (cs, error: any) =>
    ({ ...cs, serverError: error.data.error.message })
).reset(userPhotoStoreDomain.event.fileStoreReset)
userPhotoStoreDomain.store.$responseStore.on(userPhotoStoreDomain.effect.updateUserPhotoFx.failData, (cs, error: any) =>
    ({ ...cs, serverError: error.data.error.message })
)
userPhotoStoreDomain.store.$responseStore.on(userPhotoStoreDomain.effect.uploadUserPhotoFx.doneData, (cs, data) => {
    if (data.data) {
        return { ...cs, status: data.data.status }
    }
    return cs
})
userPhotoStoreDomain.store.$responseStore.on(userPhotoStoreDomain.effect.updateUserPhotoFx.doneData, (cs, data) => {
    if (data.data) {
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

// USER PROFILE
sample({
    clock: userProfileStoreDomain.event.updateUserProfileEvent,
    target: userProfileStoreDomain.effect.updateUserProfileFx,
    fn: ({ups}) => {
        const userId = localStorage.getItem('userId')
        if (userId) {
            return {
                ...ups,
                userId,
            }
        } else {
            throw new Error('No user Id or nation not exists')
        }
    },
    source: {ups: userProfileStoreDomain.store.$userProfileStore},
})
sample({
    clock: userProfileStoreDomain.event.updateUserProfileEvent,
    target: userProfileStoreDomain.event.userProfileResponseResetEvent
})
sample({
    clock: userProfileStoreDomain.effect.updateUserProfileFx.doneData,
    target: userProfileStoreDomain.event.userProfileStoreResetEvent
})
userProfileStoreDomain.store.$userProfileResponseStore.on(
    userProfileStoreDomain.effect.updateUserProfileFx.failData, (cs, error: any) => 
        ({ ...cs, serverError: error.data.error.message })
).reset(userProfileStoreDomain.event.userProfileResponseResetEvent)

userProfileStoreDomain.store.$userProfileResponseStore.on(
    userProfileStoreDomain.effect.updateUserProfileFx.doneData, (cs, data) => {
        if (data.data) {
            return { ...cs, status: data.data.status }
        }
        return cs
    }
)
userProfileStoreDomain.store.$userProfileStore.reset(userProfileStoreDomain.event.userProfileStoreResetEvent)