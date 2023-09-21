export interface ISignUpStore {
    termsOfConditionsWasRead: boolean
    email: string
    password: string
    repeatedPassword: string
    emailError?: string
    passwordError?: string
    repeatedPasswordError?: string
}

export interface INavigationAfterStore {
    onSuccessPath: string
}

export interface IServerErrorStore {
    error?: string
}