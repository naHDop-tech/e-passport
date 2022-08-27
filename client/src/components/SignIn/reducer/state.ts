export interface ISignInState {
  rememberMe: boolean
  email: string
  password: string
  emailError?: string
  passwordError?: string
}

export const defaultState: ISignInState = {
  email: '',
  password: '',
  rememberMe: false
}

export enum Actions {
  ChangeEmail = 'CHANGE_EMAIL',
  ChangePassword = 'CHANGE_PASSWORD',
  SetEmailError = 'SET_EMAIL_ERROR',
  SetPasswordError = 'SET_PASSWORD_ERROR',
  SetRememberMe = 'SET_REMEMBER_ME',
  ResetErrors = 'RESET_ERRORS',
  ResetData = 'RESET_Data',
}

export type SignInAction =
  | { type: Actions.ChangeEmail; payload: string }
  | { type: Actions.ChangePassword; payload: string }
  | { type: Actions.SetEmailError; payload: string }
  | { type: Actions.SetPasswordError; payload: string }
  | { type: Actions.SetRememberMe; payload: boolean }
  | { type: Actions.ResetErrors }
  | { type: Actions.ResetData }