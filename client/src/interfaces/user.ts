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

export enum Sex {
  Male = 'Male',
  Female = 'Female',
  It = 'It',
  Unset = 'Unset',
}

export interface IPassport {
  mrzL1: string;
  mrzL2: string;
  uNumber: string;
  pNumber: string;
  issuingOrganization: string;
  countryCode: string;
  issueDate: string;
  expirationDate: string;
  type: string;
  placeOfBirth: string;
  fingerprint: IFingerprint
}

export interface IFingerprint {
  id: string;
  publicKey: string;
}

export interface IUserProfile {
  id: string
  age: number
  email: string
  lastName: string
  firstName: string
  birthDate: string
  nationality: string
  sex: Sex
  createdAt: string | null
  updatedAt: string | null
  isVerified: boolean
  photo: IPhoto
  phone: IPhone
  address: IAddress
  passport: IPassport
  // frontend only
  isDraft: boolean
}
