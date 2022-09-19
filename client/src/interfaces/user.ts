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

export interface IResetPasswordData {
  email: string
}

export interface IUserProfile {
  email: string,
  lastName: string
  firstName: string
  birthDate: string
  countryResident: string
  id: string
  imgSrc: string

  // frontend only
  isDraft: boolean
}