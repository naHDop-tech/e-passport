import {
  IResetPasswordState,
  ResetPasswordAction,
  Actions
} from './state'

export const resetPasswordReducer = (
  state: IResetPasswordState,
  action: ResetPasswordAction
): IResetPasswordState => {
  switch (action.type) {
    case Actions.ChangeEmail:
      return { ...state, email: action.payload }
    case Actions.SetEmailError:
      return { ...state, emailError: action.payload }
    case Actions.ResetErrors:
      return { ...state, emailError: '' }
    case Actions.ResetData:
      return { ...state, email: '' }
    default:
      throw new Error('resetPasswordReducer Error during dispatch')
  }
}