import { useReducer, ChangeEvent } from 'react'

import { useSignInValidation } from '@root/hooks/validation/useSignInValidation'

import { SignInForm } from './SignInForm'

import { ISignInFormData } from '@root/interfaces/user'
import { signInReducer } from './reducer/reducer'
import { Actions, defaultState } from './reducer/state'
export interface ISignInProps {
  onSubmit: (data: ISignInFormData) => void
}

export function SignInDLC(props: ISignInProps): JSX.Element {
  const { onSubmit } = props

  const [
    { password, email, emailError, passwordError, rememberMe },
    dispatchSignInForm,
  ] = useReducer(signInReducer, defaultState)

  const signInFormValidate = useSignInValidation({ email, password })

  const submitFormHandler = () => {
    dispatchSignInForm({ type: Actions.ResetErrors })
    const validationResult = signInFormValidate()

    if (!validationResult.error) {
      onSubmit({ email, password, rememberMe })
      dispatchSignInForm({ type: Actions.ResetData })
    } else {
      if (!validationResult?.error?.details.length) {
        // TODO: toast
        console.error('Unexpected error')
      }

      for (const error of validationResult?.error?.details) {
        if (error.path[0] === 'password') {
          dispatchSignInForm({ type: Actions.SetPasswordError, payload: error.message })
        }
        if (error.path[0] === 'email') {
          dispatchSignInForm({ type: Actions.SetEmailError, payload: error.message })
        }
      }
    }
  }

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchSignInForm({ type: Actions.ChangeEmail, payload: e.target.value })
  }

  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchSignInForm({ type: Actions.ChangePassword, payload: e.target.value })
  }

  const changeRememberMeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchSignInForm({ type: Actions.SetRememberMe, payload: e.target.checked })
  }

  return (
    <SignInForm
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
