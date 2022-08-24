import { ChangeEvent } from 'react'

import { TextInput } from '../../Inputs/TextInput'
import { PasswordInput } from '../../Inputs/PasswordInput'
import { Button } from '../../Button'

import s from './LoginFormStyle.module.css'
const styles = s as unknown as ILoginStyle

interface ILoginStyle {
  Box: string
  LeftContent: string
  RightContent: string
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
        {/* TODO: img */}
      </div>
      <div className={styles.RightContent}>
        <TextInput
          value={email}
          label='Email'
          placeholder='i.e. john-doe@gmail.com'
          onChange={onEmailChange}
          errorText={emailError}
        />
        <PasswordInput
          value={password}
          label='Password'
          placeholder='i.e. "j9coEi30r#ZL"'
          onChange={onPasswordChange}
          errorText={passwordError}
        />
        <Button onClick={onSubmit}>Login</Button>
        <Button outline>Reset</Button>
      </div>
    </div>
  )
}
