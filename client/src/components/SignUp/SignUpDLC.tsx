import { ChangeEvent} from 'react'
import { useStore } from "effector-react";

import { useSignUpValidation } from '@root/hooks/validation/userSignUpValidation'

import { SignUpForm } from './SignUpForm'
import { signUpDomain } from "@components/SignUp/store";

export function SignUpDLC() {
  const store = useStore(signUpDomain.store.$signUpStore)
  const isLoading = useStore(signUpDomain.effect.inviteFriendFx.pending)
  const {
    email,
    password,
    repeatedPassword,
    repeatedPasswordError,
    passwordError,
    emailError,
    termsOfConditionsWasRead
  } = store
  const signUpFormValidate = useSignUpValidation({ email, password, repeatedPassword })

  const submitFormHandler = async () => {
    signUpDomain.api.signUpStoreApi.resetError()
    const validationResult = signUpFormValidate()

    if (!validationResult.error) {
      signUpDomain.event.createUserEvent()
    } else {
      if (!validationResult?.error?.details.length) {
        console.error('Unexpected error')
      }

      for (const error of validationResult?.error?.details) {
        if (error.path[0] === 'password') {
          signUpDomain.api.signUpStoreApi.setPasswordError(error.message)
        }
        if (error.path[0] === 'repeatedPassword') {
          signUpDomain.api.signUpStoreApi.setRepeatedPasswordError(error.message)
        }
        if (error.path[0] === 'email') {
          signUpDomain.api.signUpStoreApi.setEmailError(error.message)
        }
      }
    }
  }

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    signUpDomain.api.signUpStoreApi.setEmail(e.target.value)
  }

  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    signUpDomain.api.signUpStoreApi.setPassword(e.target.value)
  }

  const changeRepeatedPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    signUpDomain.api.signUpStoreApi.setRepeatedPassword(e.target.value)
  }

  const changeTermsOfConditionWasReadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    signUpDomain.api.signUpStoreApi.setTermsOfConditionWasRead(e.target.checked)
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
      isLoading={isLoading}
    />
  )
}
