import {
  ILoginState,
  LoginAction,
  Actions
} from './state'

export const loginReducer = (
  state: ILoginState,
  action: LoginAction
): ILoginState => {
  switch (action.type) {
    case Actions.ChangeEmail:
      return { ...state, email: action.payload }
    case Actions.ChangePassword:
      return { ...state, password: action.payload }
    case Actions.SetEmailError:
      return { ...state, emailError: action.payload }
    case Actions.SetPasswordError:
      return { ...state, passwordError: action.payload }
    case Actions.ResetErrors:
      return { ...state, passwordError: '', emailError: '' }
    default:
      throw new Error('loginReducer Error during dispatch')
  }
}