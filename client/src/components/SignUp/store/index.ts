import { sample } from "effector";
import { createDomain } from "@components/SignUp/store/init";

export const signUpDomain = createDomain('/sign-in')

sample({
    clock: signUpDomain.event.createUserEvent,
    fn: (store) => {
        return {
            email: store.email,
            password: store.password,
        }
    },
    target: signUpDomain.effect.signUpFx,
    source: signUpDomain.store.$signUpStore
})

signUpDomain.store.$responseStore.on(signUpDomain.effect.signUpFx.doneData, (_, data) => {
    if (data.data) {
        return { id: data.data?.id, email: data.data?.email }
    } else {
        console.warn("No response")
    }
})
signUpDomain.store.$serverErrorStore.on(signUpDomain.effect.signUpFx.failData, (_, error: any) => {
    return { error: error.data.error.message }
})
signUpDomain.store.$signUpStore.on(signUpDomain.event.resetData, () => signUpDomain.defaultState)
