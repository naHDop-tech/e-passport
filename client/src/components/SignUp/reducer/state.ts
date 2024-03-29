export interface ISignUpState {
  termsOfConditionsWasRead: boolean
  email: string
  password: string
  repeatedPassword: string
  emailError?: string
  passwordError?: string
  repeatedPasswordError?: string
}

export const defaultState: ISignUpState = {
  email: '',
  password: '',
  repeatedPassword: '',
  termsOfConditionsWasRead: false
}

export enum Actions {
  ChangeEmail = 'CHANGE_EMAIL',
  ChangePassword = 'CHANGE_PASSWORD',
  ChangeRepeatedPassword = 'CHANGE_REPEATED_PASSWORD',
  SetEmailError = 'SET_EMAIL_ERROR',
  SetPasswordError = 'SET_PASSWORD_ERROR',
  SetRepeatedPasswordError = 'SET_REPEATED_PASSWORD_ERROR',
  SetTermsOfConditionsWasRead = 'SET_TERMS_OF_CONDITIONS_WAS_READ',
  ResetErrors = 'RESET_ERRORS',
  ResetData = 'RESET_Data',
}

export type SignUpAction =
  | { type: Actions.ChangeEmail; payload: string }
  | { type: Actions.ChangePassword; payload: string }
  | { type: Actions.ChangeRepeatedPassword; payload: string }
  | { type: Actions.SetEmailError; payload: string }
  | { type: Actions.SetPasswordError; payload: string }
  | { type: Actions.SetRepeatedPasswordError; payload: string }
  | { type: Actions.SetTermsOfConditionsWasRead; payload: boolean }
  | { type: Actions.ResetErrors }
  | { type: Actions.ResetData }