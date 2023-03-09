import { createApi, createEffect, createEvent, createStore, sample } from "effector";

import { signUpApi } from "@components/SignUp/store/api/sign-up.api";
import { ISignUpStore } from "@components/SignUp/store/interface";
import { useToast } from "@hooks/useToast";
import { ToastType } from "@components/Toast/Toast";
import { useNavigate } from "react-router-dom";

export function createDomain(onDoneNavigatePath: string) {
    /*
    * Events
    * */
    const createUserEvent = createEvent()
    const resetData = createEvent()
    
    /*
    * Default values
    * */
    const signUpStoreDefault: ISignUpStore = {
        email: '',
        password: '',
        repeatedPassword: '',
        termsOfConditionsWasRead: false
    }

    /*
    * Stores
    * */
    const $signUpStore = createStore<ISignUpStore>(signUpStoreDefault)
    
    /*
     * Effects
     * */
    const inviteFriendFx = createEffect(signUpApi)
    const notifyFx = createEffect(({ content, type }: { content: string, type: ToastType} ) => {
        const toast = useToast()
        console.log('TOAST SHOULD BE')
        toast.open({ content, type })
    })
    const navigateOnDoneFx = createEffect(() => {
        const navigateTo = useNavigate()
        resetData()
        navigateTo(onDoneNavigatePath)
    })

    /*
     * Store's Api
     * */
    const signUpStoreApi = createApi($signUpStore, {
        setEmail: (cs, email: string) => ({ ...cs, email }),
        setPassword: (cs, password: string) => ({ ...cs, password }),
        setRepeatedPassword: (cs, repeatedPassword: string) => ({ ...cs, repeatedPassword }),
        setTermsOfConditionWasRead: (cs, termsOfConditionsWasRead: boolean) => ({ ...cs, termsOfConditionsWasRead }),
        setEmailError: (cs, emailError: string) => ({ ...cs, emailError }),
        setPasswordError: (cs, passwordError: string) => ({ ...cs, passwordError }),
        setRepeatedPasswordError: (cs, repeatedPasswordError: string) => ({ ...cs, repeatedPasswordError }),
        resetError: (cs) => ({
            ...cs,
            passwordError: undefined,
            emailError: undefined,
            repeatedPasswordError: undefined
        }),
        resetData: () => signUpStoreDefault,
    })

    return {
        api: {
            signUpStoreApi,
        },
        effect: {
            inviteFriendFx,
            notifyFx,
            navigateOnDoneFx,
        },
        event: {
            createUserEvent,
            resetData,
        },
        store: {
            $signUpStore,
        },
        defaultState: signUpStoreDefault,
    }
}