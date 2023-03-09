export interface ISignUpStore {
    termsOfConditionsWasRead: boolean
    email: string
    password: string
    repeatedPassword: string
    emailError?: string
    passwordError?: string
    repeatedPasswordError?: string
}