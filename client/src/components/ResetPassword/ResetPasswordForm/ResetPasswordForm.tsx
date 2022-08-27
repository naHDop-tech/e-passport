import { ChangeEvent } from 'react'

import { TextInput } from '@components/Inputs/TextInput'
import { Button } from '@components/Button'

import s from './ResetPasswordFormStyle.module.css'
const styles = s as IResetPasswordStyle

import cs from '@components/CommonStyle.module.css'
import { ICommonStyle } from '@components/common-style-types'

const commonStyle = cs as ICommonStyle

import ResetPasswordImage from '@static/illustrations/reset-password.png'

interface IResetPasswordStyle {
  Box: string
  LeftContent: string
  RightContent: string
}

export interface IResetPasswordFormProps {
  email: string
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
  emailError?: string
}

export function ResetPasswordForm(props: IResetPasswordFormProps) {
  const { email, onEmailChange, onSubmit, emailError } = props

  return (
    <div className={styles.Box}>
      <div className={styles.LeftContent}>
        <img src={ResetPasswordImage} />
      </div>
      <div className={styles.RightContent}>
        <h1>Reset your password</h1>
        <div className={commonStyle.Margin12} />
        <p className={commonStyle.TextWhiteGrey}>Please fill in the email field below</p>
        <p className={commonStyle.TextWhiteGrey}>We will send a link to reset your password</p>
        <div className={commonStyle.Margin32} />
        <TextInput
          value={email}
          label='Email'
          placeholder='i.e. john-doe@gmail.com'
          onChange={onEmailChange}
          errorText={emailError}
        />
        <div className={commonStyle.Margin32} />
        <Button disabled={!email.length} wide onClick={onSubmit}>Reset</Button>
      </div>
    </div>
  )
}
