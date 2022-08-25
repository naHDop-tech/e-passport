import { useReducer, ChangeEvent } from 'react'

import { useLoginValidation } from '../../hooks/validation/useLoginValidation'

import { LoginForm } from './LoginForm'

import { ILoginFormData } from '../../interfaces/user'
import { loginReducer } from './reducer/reducer'
import { Actions, defaultState } from './reducer/state'
export interface ILoginProps {
  onSubmit: (data: ILoginFormData) => void
}

export function LoginDLC(props: ILoginProps): JSX.Element {
  const { onSubmit } = props

  const [
    { password, email, emailError, passwordError, rememberMe },
    dispatchLoginForm,
  ] = useReducer(loginReducer, defaultState)

  const loginFormValidate = useLoginValidation({ email, password })

  const submitFormHandler = () => {
    dispatchLoginForm({ type: Actions.ResetErrors })
    const validationResult = loginFormValidate()

    if (!validationResult.error) {
      onSubmit({ email, password, rememberMe })
      dispatchLoginForm({ type: Actions.ResetData })
    } else {
      if (!validationResult?.error?.details.length) {
        // TODO: toast
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

  const changeRememberMeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchLoginForm({ type: Actions.SetRememberMe, payload: e.target.checked })
  }

  return (
    <LoginForm
      rememberMe={rememberMe}
      email={email}
      password={password}
      onSetRememberMe={changeRememberMeHandler}
      onEmailChange={changeEmailHandler}
      onPasswordChange={changePasswordHandler}
      onSubmit={submitFormHandler}
      emailError={emailError}
      passwordError={passwordError}
    />
  )
}
