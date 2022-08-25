import { ChangeEvent } from 'react'

import { TextInput } from '../../Inputs/TextInput'
import { PasswordInput } from '../../Inputs/PasswordInput'
import { Button } from '../../Button'

import s from './LoginFormStyle.module.css'
const styles = s as unknown as ILoginStyle

import LoginImage from '../../../../static/illustrations/login.png'

interface ILoginStyle {
  Box: string
  LeftContent: string
  RightContent: string
  Margin24: string
  Margin32: string
  Margin64: string
}

export interface ILoginFormProps {
  email: string
  password: string
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
  emailError?: string
  passwordError?: string
}

export function LoginForm(props: ILoginFormProps) {
  const { email, password, emailError, passwordError, onEmailChange, onPasswordChange, onSubmit } = props

  return (
    <div className={styles.Box}>
      <div className={styles.LeftContent}>
        <img src={LoginImage} />
      </div>
      <div className={styles.RightContent}>
        <h1>Sign in to your account</h1>
        <p>Don't have an account? <a href="#">Sign up</a></p>
        <div className={styles.Margin32} />
        <TextInput
          value={email}
          label='Email'
          placeholder='i.e. john-doe@gmail.com'
          onChange={onEmailChange}
          errorText={emailError}
        />
        <div className={styles.Margin24} />
        <PasswordInput
          value={password}
          label='Password'
          placeholder='i.e. "j9coEi30r#ZL"'
          onChange={onPasswordChange}
          errorText={passwordError}
        />
        <div className={styles.Margin64} />
        <Button wide onClick={onSubmit}>Login</Button>
        <div className={styles.Margin24} />
        <Button wide outline>Google</Button>
      </div>
    </div>
  )
}
