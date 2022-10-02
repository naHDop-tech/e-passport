import { InputHTMLAttributes } from 'react'
import cn from 'classnames';

import s from './NumberInputStyle.module.css'
const styles = s as unknown as INumberInputStyle

import cs from '@components/CommonStyle.module.css'
import { ICommonStyle } from '@components/common-style-types'

const commonStyle = cs as ICommonStyle

interface INumberInputStyle {
  Input: string
  Label: string
  Error: string
  PositionRelative: string
}

interface INumberInputProps {
  label?: string
  errorText?: string
}

export type NumberInputProps = INumberInputProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export function NumberInput(props: NumberInputProps): JSX.Element {
  const { label, errorText, ...rest} = props
  return (
    <div className={styles.PositionRelative}>
      {label && <label className={cn(styles.Label, {[commonStyle.Disabled]: rest.disabled})}>{label}</label>}
      <input type="number" className={styles.Input} {...rest} />
      {errorText && <p className={cn(styles.Error, {[commonStyle.Disabled]: rest.disabled})}>{errorText}</p>}
    </div>
  )
}
