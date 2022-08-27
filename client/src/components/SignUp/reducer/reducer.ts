import {
  ISignUpState,
  SignUpAction,
  Actions
} from './state'

export const signUpReducer = (
  state: ISignUpState,
  action: SignUpAction
): ISignUpState => {
  switch (action.type) {
    case Actions.ChangeEmail:
      return { ...state, email: action.payload }
    case Actions.ChangePassword:
      return { ...state, password: action.payload }
    case Actions.ChangeRepeatedPassword:
      return { ...state, repeatedPassword: action.payload }
    case Actions.SetEmailError:
      return { ...state, emailError: action.payload }
    case Actions.SetPasswordError:
      return { ...state, passwordError: action.payload }
    case Actions.SetRepeatedPasswordError:
      return { ...state, repeatedPasswordError: action.payload }
    case Actions.SetTermsOfConditionsWasRead:
      return { ...state, termsOfConditionsWasRead: action.payload }
    case Actions.ResetErrors:
      return { ...state, passwordError: '', emailError: '', repeatedPasswordError: '' }
    case Actions.ResetData:
      return { ...state, password: '', email: '', repeatedPassword: '', termsOfConditionsWasRead: false }
    default:
      throw new Error('signUpReducer Error during dispatch')
  }
}