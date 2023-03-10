export interface ILoginPayload {
    email: string
    password: string
    emailError?: string
    passwordError?: string
}

export interface ILoginResponse {
    id: string
    token: string
}
