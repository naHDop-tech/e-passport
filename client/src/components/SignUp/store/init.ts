import { createApi, createEffect, createEvent, createStore } from "effector";

import { signUpApi } from "@components/SignUp/store/api/sign-up.api";
import { INavigationAfterStore, IServerErrorStore, ISignUpStore } from "@components/SignUp/store/interface";
import {ISignUpResponse} from "@components/SignUp/store/api/interface";

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
    const navigationDefault: INavigationAfterStore = {
        onSuccessPath: onDoneNavigatePath || '/'
    }
    const serverErrorDefault: IServerErrorStore = {}
    const responseStoreDefault: ISignUpResponse = {
        id: '',
        email: '',
    }

    /*
    * Stores
    * */
    const $signUpStore = createStore<ISignUpStore>(signUpStoreDefault)
    const $navigationAfterStore = createStore<INavigationAfterStore>(navigationDefault)
    const $serverErrorStore = createStore<IServerErrorStore>(serverErrorDefault)
    const $responseStore = createStore<ISignUpResponse>(responseStoreDefault)
    
    /*
     * Effects
     * */
    const signUpFx = createEffect(signUpApi)

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
        api: signUpStoreApi,
        effect: {
            signUpFx,
        },
        event: {
            createUserEvent,
            resetData,
        },
        store: {
            $signUpStore,
            $navigationAfterStore,
            $serverErrorStore,
            $responseStore,
        },
        defaultState: signUpStoreDefault,
    }
}