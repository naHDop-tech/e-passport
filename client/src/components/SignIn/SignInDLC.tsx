import { useReducer, ChangeEvent } from 'react'
import { useMutation } from '@apollo/client'

import { useSignInValidation } from '@root/hooks/validation/useSignInValidation'

import { SignInForm } from './SignInForm'
import { SIGN_IN } from '@root/api/mutations/sign-in'
import { signInReducer } from './reducer/reducer'
import { Actions, defaultState } from './reducer/state'
export interface ISignInProps {
  onSubmit: (token: string) => void
}

export function SignInDLC(props: ISignInProps): JSX.Element {
  const { onSubmit } = props

  const [
    { password, email, emailError, passwordError, rememberMe },
    dispatchSignInForm,
  ] = useReducer(signInReducer, defaultState)
  const [signInUser, { loading }] = useMutation(SIGN_IN)

  const signInFormValidate = useSignInValidation({ email, password })

  const submitFormHandler = async () => {
    dispatchSignInForm({ type: Actions.ResetErrors })
    const validationResult = signInFormValidate()

    if (!validationResult.error) {
      try {
        const { data } = await signInUser({ variables: { signInInput: { email, password } }})

        onSubmit(data.signIn.token)
        dispatchSignInForm({ type: Actions.ResetData })
      } catch (err) {
        console.error(err)
      }
    } else {
      if (!validationResult?.error?.details.length) {
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
    <>
      <SignInForm
        isLoading={loading}
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
    </>
  )
}
