import { InputHTMLAttributes } from 'react'
import cn from 'classnames';

import s from './TextInputStyle.module.css'
const styles = s as unknown as ITextInputStyle

interface ITextInputStyle {
  Input: string
  Label: string
  Error: string
  Disabled: string
  PositionRelative: string
}

interface ITextInputProps {
  label?: string
  errorText?: string
}

export type TextInputProps = ITextInputProps & InputHTMLAttributes<HTMLInputElement>

export function TextInput(props: TextInputProps): JSX.Element {
  const { label, errorText, ...rest} = props
  return (
    <div className={styles.PositionRelative}>
      {label && <label className={cn(styles.Label, {[styles.Disabled]: rest.disabled})}>{label}</label>}
      <input className={styles.Input} {...rest} />
      {errorText && <p className={cn(styles.Error, {[styles.Disabled]: rest.disabled})}>{errorText}</p>}
    </div>
  )
}
