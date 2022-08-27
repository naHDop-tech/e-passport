import { ChangeEvent } from 'react'

import { NavLink } from 'react-router-dom'

import { TextInput } from '@components/Inputs/TextInput'
import { PasswordInput } from '@components/Inputs/PasswordInput'
import { Button } from '@components/Button'

import s from './SignUpFormStyle.module.css'
const styles = s as ISignUpStyle

import cs from '@components/CommonStyle.module.css'
import { ICommonStyle } from '@components/common-style-types'

import SignUpImage from '@static/illustrations/sign-up.png'

const commonStyle = cs as ICommonStyle

interface ISignUpStyle {
  Box: string
  LeftContent: string
  RightContent: string
}

export interface ISignUpFormProps {
  email: string
  password: string
  repeatedPassword: string
  isTermsOfConditionsWasRead: boolean,
  onSetReadTermsOfConditions: (e: ChangeEvent<HTMLInputElement>) => void
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void
  onRepeatedPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
  emailError?: string
  passwordError?: string
  repeatedPasswordError?: string
}


export function SignUpForm(props: ISignUpFormProps) {
  const {
    email,
    password,
    repeatedPassword,
    isTermsOfConditionsWasRead,
    onSetReadTermsOfConditions,
    onRepeatedPasswordChange,
    emailError,
    passwordError,
    repeatedPasswordError,
    onEmailChange,
    onPasswordChange,
    onSubmit
  } = props

  return (
    <div className={styles.Box}>
      <div className={styles.LeftContent}>
        <img src={SignUpImage} />
      </div>
      <div className={styles.RightContent}>
        <h1>Create a new account</h1>
        <div className={commonStyle.Margin12} />
        <p>Already have an account? <NavLink to="/sign-in">Sign in</NavLink></p>
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
        <div className={commonStyle.Margin24} />
        <PasswordInput
          value={repeatedPassword}
          label='Repeated password'
          placeholder='Repeat your password above'
          onChange={onRepeatedPasswordChange}
          errorText={repeatedPasswordError}
        />
        <div className={commonStyle.Margin32} />
        <div className={commonStyle.FlexBetween}>
          {/* TODO: restyle here */}
          <div style={{ display: 'flex' }}>
            <input
              checked={isTermsOfConditionsWasRead}
              onChange={onSetReadTermsOfConditions} type="checkbox"
            /><span style={{ marginLeft: '10px' }}>I have read and agree to the <NavLink to="/terms-of-conditions">Terms of conditions</NavLink></span>
          </div>
        </div>
        <div className={commonStyle.Margin32} />
        <Button disabled={!isTermsOfConditionsWasRead} wide onClick={onSubmit}>Sign Up</Button>
      </div>
    </div>
  )
}
