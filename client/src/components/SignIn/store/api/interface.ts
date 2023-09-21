export interface ILoginPayload {
    email: string
    password: string
    emailError?: string
    passwordError?: string
}

export interface ILoginResponse {
    user_id: string
    token: string
}
