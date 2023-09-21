import { sample } from "effector";
import { createDomain } from "@components/SignIn/store/init";

export const loginDomain = createDomain('/dashboard')

sample({
    clock: loginDomain.event.loginEvent,
    fn: (store) => {
        loginDomain.api.loginServerErrorApi.reset()
        return {
            email: store.email,
            password: store.password,
        }
    },
    target: loginDomain.effect.loginFx,
    source: loginDomain.store.$loginStore
})

loginDomain.store.$responseStore.on(loginDomain.effect.loginFx.doneData, (_, data) => {
    if (data.data) {
        localStorage.setItem("accessToken", data.data?.token)
        localStorage.setItem("userId", data.data?.user_id)
        loginDomain.api.responseStoreApi.reset()
        loginDomain.api.loginStoreApi.resetData()
        return { token: data.data?.token, user_id: data.data?.user_id }
    } else {
        console.warn("No user data")
    }
})
loginDomain.store.$serverErrorStore.on(loginDomain.effect.loginFx.failData, (_, error: any) => {
    loginDomain.api.loginStoreApi.resetError()
    return { error: error.data.error.message }
})
loginDomain.store.$loginStore.on(loginDomain.event.resetDataEvent, () => loginDomain.defaultState)