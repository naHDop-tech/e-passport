export interface ISignInFormData {
  email: string
  password: string
  rememberMe?: boolean
}

export interface ISignUpFormData {
  email: string
  password: string
  repeatedPassword: string
  isTermsOfConditionsWasRead?: boolean
}