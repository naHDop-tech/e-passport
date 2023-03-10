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

// @ts-ignore
signUpDomain.store.$signUpStore.on(signUpDomain.effect.signUpFx.doneData, () => ({ userWasCreated: true }))
signUpDomain.store.$serverErrorStore.on(signUpDomain.effect.signUpFx.failData, (_, error: any) => ({ error }))
signUpDomain.store.$signUpStore.on(signUpDomain.event.resetData, () => signUpDomain.defaultState)
