export interface IResetPasswordState {
  email: string
  emailError?: string
}

export const defaultState: IResetPasswordState = {
  email: '',
}

export enum Actions {
  ChangeEmail = 'CHANGE_EMAIL',
  SetEmailError = 'SET_EMAIL_ERROR',
  ResetErrors = 'RESET_ERRORS',
  ResetData = 'RESET_Data',
}

export type ResetPasswordAction =
  | { type: Actions.ChangeEmail; payload: string }
  | { type: Actions.SetEmailError; payload: string }
  | { type: Actions.ResetErrors }
  | { type: Actions.ResetData }