import { useReducer, ChangeEvent } from 'react'

import { useResetPasswordValidation } from '@root/hooks/validation/userResetPasswordValidation'

import { ResetPasswordForm } from './ResetPasswordForm'

import { IResetPasswordData } from '@root/interfaces/user'
import { resetPasswordReducer } from './reducer/reducer'
import { Actions, defaultState } from './reducer/state'

export interface IResetPasswordProps {
  onSubmit: (data: IResetPasswordData) => void
}


export function ResetPasswordDLC(props: IResetPasswordProps) {
  const { onSubmit } = props

  const [
    { email, emailError },
    dispatchResetPassword,
  ] = useReducer(resetPasswordReducer, defaultState)

  const signInFormValidate = useResetPasswordValidation({ email })

  const submitFormHandler = () => {
    dispatchResetPassword({ type: Actions.ResetErrors })
    const validationResult = signInFormValidate()

    if (!validationResult.error) {
      onSubmit({ email })
      dispatchResetPassword({ type: Actions.ResetData })
    } else {
      if (!validationResult?.error?.details.length) {
        // TODO: toast
        console.error('Unexpected error')
      }

      for (const error of validationResult?.error?.details) {
        if (error.path[0] === 'email') {
          dispatchResetPassword({ type: Actions.SetEmailError, payload: error.message })
        }
      }
    }
  }

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchResetPassword({ type: Actions.ChangeEmail, payload: e.target.value })
  }

  return (
    <ResetPasswordForm
      email={email}
      onEmailChange={changeEmailHandler}
      emailError={emailError}
      onSubmit={submitFormHandler}
    />
  )
}
