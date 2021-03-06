import { PropsWithChildren, ButtonHTMLAttributes } from 'react'
import cn from 'classnames';

import s from './Button.module.css'
const styles = s as unknown as IButtonStyle

export enum ButtonTypes {
  Primary = 'type-primary',
  Secondary = 'type-secondary',
  Danger = 'type-danger',
  Warning = 'type-warning',
  Success = 'type-success',
  Accent = 'type-accent',
}

interface IButtonStyle {
  base: string
  'click-animation': string
  'type-primary': string
  'type-secondary': string
  'type-danger': string
  'type-warning': string
  'type-success': string
  'type-accent': string
}

interface IAdditionButtonProps {
  title?: string
  bType?: ButtonTypes
}

export type ButtonProps = IAdditionButtonProps & ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: PropsWithChildren<ButtonProps>): JSX.Element {
  const { title, onClick, children, bType = ButtonTypes.Primary,  ...rest } = props

  return (
    <button
      className={cn(styles['click-animation'], styles.base, styles[bType])}
      onClick={onClick}
      {...rest}
    >
      {children ? children : title}
    </button>
  )
}
