import {createApi, createEffect, createEvent, createStore} from "effector";

import { INavigationAfterStore, IServerErrorStore, ILoginStore } from "@components/SignIn/store/interface";
import { loginApi } from "@components/SignIn/store/api/sign-in.api";
import { ILoginResponse } from "@components/SignIn/store/api/interface";


export function createDomain(onDoneNavigatePath: string) {
    /*
    * Events
    * */
    const loginEvent = createEvent()
    const resetDataEvent = createEvent()

    /*
    * Default values
    * */
    const loginStoreDefault: ILoginStore = {
        email: '',
        password: '',
        rememberMe: false,
    }
    const navigationDefault: INavigationAfterStore = {
        onSuccessPath: onDoneNavigatePath || '/'
    }
    const serverErrorDefault: IServerErrorStore = {}
    const responseStoreDefault: ILoginResponse = {
        user_id: '',
        token: '',
    }

    /*
    * Stores
    * */
    const $loginStore = createStore<ILoginStore>(loginStoreDefault)
    const $navigationAfterStore = createStore<INavigationAfterStore>(navigationDefault)
    const $serverErrorStore = createStore<IServerErrorStore>(serverErrorDefault)
    const $responseStore = createStore<ILoginResponse>(responseStoreDefault)

    /*
     * Effects
     * */
    const loginFx = createEffect(loginApi)

    /*
     * Store's Api
     * */
    const loginStoreApi = createApi($loginStore, {
        setEmail: (cs, email: string) => ({ ...cs, email }),
        setPassword: (cs, password: string) => ({ ...cs, password }),
        setEmailError: (cs, emailError: string) => ({ ...cs, emailError }),
        setPasswordError: (cs, passwordError: string) => ({ ...cs, passwordError }),
        setRememberMe: (cs, rememberMe: boolean) => ({ ...cs, rememberMe }),
        resetError: (cs) => ({
            ...cs,
            passwordError: undefined,
            emailError: undefined,
            repeatedPasswordError: undefined
        }),
        resetData: () => loginStoreDefault,
    })
    const loginServerErrorApi = createApi($serverErrorStore, {
        reset: () => serverErrorDefault
    })
    const responseStoreApi = createApi($responseStore, {
        reset: () => responseStoreDefault
    })
    
    return {
        api: {
            loginStoreApi,
            loginServerErrorApi,
            responseStoreApi,
        },
        store: {
            $loginStore,
            $navigationAfterStore,
            $serverErrorStore,
            $responseStore,
        },
        event: {
            loginEvent,
            resetDataEvent,
        },
        effect: {
            loginFx,
        },
        defaultState: loginStoreDefault
    }
}