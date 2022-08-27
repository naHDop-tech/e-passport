import { useReducer, ChangeEvent } from 'react'

import { SignUpForm } from './SignUpForm'

import { useSignUpValidation } from '@root/hooks/validation/userSignUpValidation'
import { ISignUpFormData } from '@root/interfaces/user'
import { signUpReducer } from './reducer/reducer'
import { Actions, defaultState } from './reducer/state'

export interface ISignUpProps {
  onSubmit: (data: ISignUpFormData) => void
}

export function SignUpDLC(props: ISignUpProps) {
  const { onSubmit } = props
  const [
    {
      password,
      email,
      repeatedPassword,
      termsOfConditionsWasRead,
      emailError,
      passwordError,
      repeatedPasswordError
    },
    dispatchSignUpForm,
  ] = useReducer(signUpReducer, defaultState)

  const signUpFormValidate = useSignUpValidation({ email, password, repeatedPassword })

  const submitFormHandler = () => {
    dispatchSignUpForm({ type: Actions.ResetErrors })
    const validationResult = signUpFormValidate()

    if (!validationResult.error) {
      onSubmit({
        email,
        password,
        isTermsOfConditionsWasRead: termsOfConditionsWasRead,
        repeatedPassword })
      dispatchSignUpForm({ type: Actions.ResetData })
    } else {
      if (!validationResult?.error?.details.length) {
        // TODO: toast
        console.error('Unexpected error')
      }

      for (const error of validationResult?.error?.details) {
        if (error.path[0] === 'password') {
          dispatchSignUpForm({ type: Actions.SetPasswordError, payload: error.message })
        }
        if (error.path[0] === 'repeatedPassword') {
          dispatchSignUpForm({ type: Actions.SetRepeatedPasswordError, payload: error.message })
        }
        if (error.path[0] === 'email') {
          dispatchSignUpForm({ type: Actions.SetEmailError, payload: error.message })
        }
      }
    }
  }

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchSignUpForm({ type: Actions.ChangeEmail, payload: e.target.value })
  }

  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchSignUpForm({ type: Actions.ChangePassword, payload: e.target.value })
  }

  const changeRepeatedPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchSignUpForm({ type: Actions.ChangeRepeatedPassword, payload: e.target.value })
  }

  const changeTermsOfConditionWasReadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchSignUpForm({ type: Actions.SetTermsOfConditionsWasRead, payload: e.target.checked })
  }

  return (
    <SignUpForm
      email={email}
      password={password}
      repeatedPassword={repeatedPassword}
      emailError={emailError}
      passwordError={passwordError}
      repeatedPasswordError={repeatedPasswordError}
      isTermsOfConditionsWasRead={termsOfConditionsWasRead}
      onSetReadTermsOfConditions={changeTermsOfConditionWasReadHandler}
      onEmailChange={changeEmailHandler}
      onPasswordChange={changePasswordHandler}
      onRepeatedPasswordChange={changeRepeatedPasswordHandler}
      onSubmit={submitFormHandler}
    />
  )
}