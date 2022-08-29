import { ChangeEvent } from 'react'
import { NavLink } from 'react-router-dom'

import { TextInput } from '@components/Inputs/TextInput'
import { PasswordInput } from '@components/Inputs/PasswordInput'
import { Button } from '@components/Button'

import s from './SignInFormStyle.module.css'
const styles = s as ISignInStyle

import cs from '@components/CommonStyle.module.css'
import { ICommonStyle } from '@components/common-style-types'

const commonStyle = cs as ICommonStyle

import SignInImage from '@static/illustrations/sign-in.png'

interface ISignInStyle {
  Box: string
  LeftContent: string
  RightContent: string
}

export interface ISignInFormProps {
  email: string
  password: string
  rememberMe: boolean,
  onSetRememberMe: (e: ChangeEvent<HTMLInputElement>) => void
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
  emailError?: string
  passwordError?: string
  isLoading?: boolean
}

export function SignInForm(props: ISignInFormProps) {
  const {
    email,
    password,
    rememberMe,
    onSetRememberMe,
    emailError,
    passwordError,
    onEmailChange,
    onPasswordChange,
    onSubmit,
    isLoading,
  } = props

  if (isLoading) {
    // TODO: rework
    return (
      <div className={styles.Box}>
        Loading...
      </div>
    )
  }

  return (
    <div className={styles.Box}>
      <div className={styles.LeftContent}>
        <img src={SignInImage} />
      </div>
      <div className={styles.RightContent}>
        <h1>Sign in to your account</h1>
        <div className={commonStyle.Margin12} />
        <p>Don't have an account? <NavLink to="/sign-up">Sign up</NavLink></p>
        <div className={commonStyle.Margin32} />
        <TextInput
          value={email}
          label='Email'
          placeholder='i.e. john-doe@gmail.com'
          onChange={onEmailChange}
          errorText={emailError}
        />
        <div className={commonStyle.Margin24} />
        <PasswordInput
          value={password}
          label='Password'
          placeholder='i.e. "j9coEi30r#ZL"'
          onChange={onPasswordChange}
          errorText={passwordError}
        />
        <div className={commonStyle.Margin32} />
        <div className={commonStyle.FlexBetween}>
          {/* TODO: restyle here */}
          {/* TODO: tooltip with terms of data state saving */}
          <div style={{ display: 'flex', gap: '5px' }}>
            <input
              checked={rememberMe}
              onChange={onSetRememberMe} type="checkbox"
            /><span>Remember me</span>
            </div>
          <div><NavLink to="/reset-password">Forgot password?</NavLink></div>
        </div>
        <div className={commonStyle.Margin32} />
        <Button disabled={!rememberMe} wide onClick={onSubmit}>Sign in</Button>
        <div className={commonStyle.Margin24} />
        <Button disabled={!rememberMe} wide outline>Google</Button>
      </div>
    </div>
  )
}
