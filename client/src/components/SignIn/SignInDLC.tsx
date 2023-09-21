import { ChangeEvent, useEffect } from 'react'
import { useStore } from "effector-react";
import { useNavigate } from "react-router-dom";

import { useSignInValidation } from '@root/hooks/validation/useSignInValidation'
import { useToast } from '@hooks/useToast'
import { ToastType } from '@components/Toast/Toast'

import { SignInForm } from './SignInForm'
import { loginDomain } from "@components/SignIn/store";

export function SignInDLC(): JSX.Element {
  const loginStore = useStore(loginDomain.store.$loginStore)
  const responseStore = useStore(loginDomain.store.$responseStore)
  const isLoading = useStore(loginDomain.effect.loginFx.pending)
  const navigateStore = useStore(loginDomain.store.$navigationAfterStore)
  const serverErrorStore = useStore(loginDomain.store.$serverErrorStore)
  const { email, password, rememberMe, passwordError, emailError } = loginStore
  const toast = useToast()
  const navigateTo = useNavigate()
  
  const signInFormValidate = useSignInValidation({ email, password })

  useEffect(() => {
    if (serverErrorStore.error) {
      toast.open({ content: serverErrorStore.error, type: ToastType.Error })
    }
  }, [serverErrorStore.error])

  useEffect(() => {
    if (responseStore.token) {
      toast.open({ content: "You are login", type: ToastType.Success })
      navigateTo(navigateStore.onSuccessPath)
    }
  }, [responseStore.token])

  const submitFormHandler = async () => {
    const validationResult = signInFormValidate()

    if (!validationResult.error) {
      loginDomain.event.loginEvent()
    } else {
      if (!validationResult?.error?.details.length) {
        console.error('Unexpected error')
      }

      for (const error of validationResult?.error?.details) {
        if (error.path[0] === 'password') {
          loginDomain.api.loginStoreApi.setPasswordError(error.message)
        }
        if (error.path[0] === 'email') {
          loginDomain.api.loginStoreApi.setEmailError(error.message)
        }
      }
    }
  }

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    loginDomain.api.loginStoreApi.setEmail(e.target.value)
  }

  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    loginDomain.api.loginStoreApi.setPassword(e.target.value)
  }

  const changeRememberMeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    loginDomain.api.loginStoreApi.setRememberMe(e.target.checked)
  }

  return (
    <>
      <SignInForm
        isLoading={isLoading}
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
