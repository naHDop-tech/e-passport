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
  id: string
  age: number
  email: string
  lastName: string
  firstName: string
  birthDate: string
  countryResident: string
  createdAt: string | null
  updatedAt: string | null
  isVerified: boolean
  photo: {
    filename: string
    mimetype: string
    encoding: string
    createdAt?: string
    updatedAt?: string
    isDeleted?: boolean
  }

  // frontend only
  isDraft: boolean
}
