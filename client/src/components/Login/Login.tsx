import { useReducer, ChangeEvent } from 'react'

import { useLoginValidation } from '../../hooks/validation/useLoginValidation'

import { LoginForm } from '../LoginForm'

import { ILoginFormData } from '../../interfaces/user'
import { loginReducer } from './reducer/reducer'
import { Actions } from './reducer/state'
export interface ILoginProps {
  onSubmit: (data: ILoginFormData) => void
}

export function Login(props: ILoginProps): JSX.Element {
  const { onSubmit } = props

  const [
    { password, email, emailError, passwordError },
    dispatchLoginForm,
  ] = useReducer(loginReducer, { email: '', password: '' })

  const loginFormValidate = useLoginValidation({ email, password })

  const submitFormHandler = () => {
    dispatchLoginForm({ type: Actions.ResetErrors })
    const validationResult = loginFormValidate()

    if (!validationResult.error) {
      onSubmit({ email, password })
    } else {
      if (!validationResult?.error?.details.length) {
        console.error('Unexpected error')
      }

      for (const error of validationResult?.error?.details) {
        if (error.path[0] === 'password') {
          dispatchLoginForm({ type: Actions.SetPasswordError, payload: error.message })
        }
        if (error.path[0] === 'email') {
          dispatchLoginForm({ type: Actions.SetEmailError, payload: error.message })
        }
      }
    }
  }

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchLoginForm({ type: Actions.ChangeEmail, payload: e.target.value })
  }

  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchLoginForm({ type: Actions.ChangePassword, payload: e.target.value })
  }

  return (
    <LoginForm
      onEmailChange={changeEmailHandler}
      onPasswordChange={changePasswordHandler}
      onSubmit={submitFormHandler}
      emailError={emailError}
      passwordError={passwordError}
    />
  )
}
