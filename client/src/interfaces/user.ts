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

export interface IPhoto {
  filename: string
  mimetype: string
  encoding: string
  createdAt?: string
  updatedAt?: string
  isDeleted?: boolean
}

export interface IPhone {
  countryCode: string
  number: string
}

export interface IAddress {
  country: string;
  city: string;
  line1: string;
  line2: string;
  zip: string;
  createdAt: string;
  updatedAt: string;
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
  photo: IPhoto
  phone: IPhone
  address: IAddress
  // frontend only
  isDraft: boolean
}
