import { InputHTMLAttributes } from 'react'
import cn from 'classnames';

import s from './PasswordInputStyle.module.css'
const styles = s as unknown as IPasswordInputStyle

interface IPasswordInputStyle {
  Input: string
  Label: string
  Error: string
  Disabled: string
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
      {label && <label className={cn(styles.Label, {[styles.Disabled]: rest.disabled})}>{label}</label>}
      <input type="password" className={styles.Input} {...rest} />
      {errorText && <p className={cn(styles.Error, {[styles.Disabled]: rest.disabled})}>{errorText}</p>}
    </div>
  )
}
