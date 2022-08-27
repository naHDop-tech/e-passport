import { InputHTMLAttributes } from 'react'
import cn from 'classnames';

import s from './PasswordInputStyle.module.css'
const styles = s as unknown as IPasswordInputStyle

import cs from '@components/CommonStyle.module.css'
import { ICommonStyle } from '@components/common-style-types'

const commonStyle = cs as ICommonStyle

interface IPasswordInputStyle {
  Input: string
  Label: string
  Error: string
  PositionRelative: string
}

interface IPasswordInputProps {
  label?: string
  errorText?: string
}

export type PasswordInputProps = IPasswordInputProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export function PasswordInput(props: PasswordInputProps) {
  const { label, errorText, ...rest} = props
  return (
    <div className={styles.PositionRelative}>
      {label && <label className={cn(styles.Label, {[commonStyle.Disabled]: rest.disabled})}>{label}</label>}
      <input type="password" className={styles.Input} {...rest} />
      {errorText && <p className={cn(styles.Error, {[commonStyle.Disabled]: rest.disabled})}>{errorText}</p>}
    </div>
  )
}
