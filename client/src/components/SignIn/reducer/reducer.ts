import {
  ISignInState,
  SignInAction,
  Actions
} from './state'

export const signInReducer = (
  state: ISignInState,
  action: SignInAction
): ISignInState => {
  switch (action.type) {
    case Actions.ChangeEmail:
      return { ...state, email: action.payload }
    case Actions.ChangePassword:
      return { ...state, password: action.payload }
    case Actions.SetEmailError:
      return { ...state, emailError: action.payload }
    case Actions.SetPasswordError:
      return { ...state, passwordError: action.payload }
    case Actions.SetRememberMe:
      return { ...state, rememberMe: action.payload }
    case Actions.ResetErrors:
      return { ...state, passwordError: '', emailError: '' }
    case Actions.ResetData:
      return { ...state, password: '', email: '', rememberMe: false }
    default:
      throw new Error('signInReducer Error during dispatch')
  }
}