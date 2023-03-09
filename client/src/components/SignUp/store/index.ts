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

sample({
    clock: signUpDomain.effect.inviteFriendFx.failData,
    fn: (error) => {
        return {
            content: error.message,
            type: ToastType.Error
        }
    },
    target: signUpDomain.effect.notifyFx,
})

sample({
    clock: signUpDomain.effect.inviteFriendFx.doneData,
    target: signUpDomain.effect.navigateOnDoneFx
})

signUpDomain.store.$signUpStore.on(signUpDomain.event.resetData, () => signUpDomain.defaultState)
