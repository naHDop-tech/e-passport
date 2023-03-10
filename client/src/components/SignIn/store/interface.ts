export interface ILoginStore {
    rememberMe: boolean
    email: string
    password: string
    emailError?: string
    passwordError?: string
}

export interface INavigationAfterStore {
    onSuccessPath: string
}

export interface IServerErrorStore {
    error?: string
}