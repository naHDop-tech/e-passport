import { ChangeEvent, useEffect } from 'react'
import {useStore} from "effector-react";

import {useSignUpValidation} from '@root/hooks/validation/userSignUpValidation'

import {SignUpForm} from './SignUpForm'
import {signUpDomain} from "@components/SignUp/store";
import {useToast} from '@root/hooks/useToast';
import {ToastType} from "@components/Toast/Toast";
import {useNavigate} from "react-router-dom";

export function SignUpDLC() {
  const store = useStore(signUpDomain.store.$signUpStore)
  const serverErrorStore = useStore(signUpDomain.store.$serverErrorStore)
  const responseStore = useStore(signUpDomain.store.$responseStore)
  const navigateStore = useStore(signUpDomain.store.$navigationAfterStore)
  const isLoading = useStore(signUpDomain.effect.signUpFx.pending)
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
  const toast = useToast()
  const navigateTo = useNavigate()

  useEffect(() => {
    if(serverErrorStore.error) {
      toast.open({ content: serverErrorStore.error, type: ToastType.Error })
    }
  }, [serverErrorStore.error])
  
  useEffect(() => {
    if (responseStore.email) {
      toast.open({ content: "User created", type: ToastType.Success })
      navigateTo(navigateStore.onSuccessPath)
    }
  }, [responseStore.email])

  const submitFormHandler = async () => {
    signUpDomain.api.resetError()
    const validationResult = signUpFormValidate()

    if (!validationResult.error) {
      signUpDomain.event.createUserEvent()
    } else {
      if (!validationResult?.error?.details.length) {
        console.error('Unexpected error')
      }

      for (const error of validationResult?.error?.details) {
        if (error.path[0] === 'password') {
          signUpDomain.api.setPasswordError(error.message)
        }
        if (error.path[0] === 'repeatedPassword') {
          signUpDomain.api.setRepeatedPasswordError(error.message)
        }
        if (error.path[0] === 'email') {
          signUpDomain.api.setEmailError(error.message)
        }
      }
    }
  }

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    signUpDomain.api.setEmail(e.target.value)
  }

  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    signUpDomain.api.setPassword(e.target.value)
  }

  const changeRepeatedPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    signUpDomain.api.setRepeatedPassword(e.target.value)
  }

  const changeTermsOfConditionWasReadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    signUpDomain.api.setTermsOfConditionWasRead(e.target.checked)
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
