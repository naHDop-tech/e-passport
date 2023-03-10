import { sample } from "effector";
import { createDomain } from "@components/SignIn/store/init";

export const loginDomain = createDomain('/dashboard')

sample({
    clock: loginDomain.event.loginEvent,
    fn: (store) => {
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
        localStorage.setItem("userId", data.data?.id)
        return { token: data.data?.token, id: data.data?.id }
    } else {
        console.warn("No user data")
    }
})
loginDomain.store.$serverErrorStore.on(loginDomain.effect.loginFx.failData, (_, error: any) => ({ error }))
loginDomain.store.$loginStore.on(loginDomain.event.loginEvent, () => loginDomain.defaultState)