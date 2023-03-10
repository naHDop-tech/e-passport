import { sample } from "effector";
import { createDomain } from "@components/SignUp/store/init";
import { ToastType } from "@components/Toast/Toast";

export const signUpDomain = createDomain('/sign-in')

sample({
    clock: signUpDomain.event.createUserEvent,
    fn: (store) => {
        return {
            email: store.email,
            password: store.password,
        }
    },
    target: signUpDomain.effect.inviteFriendFx,
    source: signUpDomain.store.$signUpStore
})

// @ts-ignore
signUpDomain.store.$signUpStore.on(signUpDomain.effect.inviteFriendFx.doneData, () => ({ userWasCreated: true }))
signUpDomain.store.$serverErrorStore.on(signUpDomain.effect.inviteFriendFx.failData, (_, error: any) => ({ error }))
signUpDomain.store.$signUpStore.on(signUpDomain.event.resetData, () => signUpDomain.defaultState)
