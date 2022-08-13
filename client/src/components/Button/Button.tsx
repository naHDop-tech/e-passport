import { PropsWithChildren, ButtonHTMLAttributes } from 'react'
import cn from 'classnames';

import s from './ButtonStyle.module.css'
const styles = s as unknown as IButtonStyle

export enum ButtonTypes {
  Primary = 'primary',
  Secondary = 'secondary',
  Danger = 'danger',
  Warning = 'warning',
  Success = 'success',
  Accent = 'accent',
}

interface IButtonStyle {
  base: string
  'click-animation': string
  'primary': string
  'secondary': string
  'danger': string
  'warning': string
  'success': string
  'accent': string
  'outline': string
  'primary-outline': string
  'secondary-outline': string
  'danger-outline': string
  'warning-outline': string
  'success-outline': string
  'accent-outline': string
  'outline-outline': string
  'wide': string
}

interface IAdditionButtonProps {
  title?: string
  bType?: ButtonTypes
  outline?: boolean
  wide?: boolean
}

export type ButtonProps = IAdditionButtonProps & ButtonHTMLAttributes<HTMLButtonElement>


const getColor = (type: ButtonTypes, isOutline: boolean): string => {
  if (type === ButtonTypes.Primary) {
    if (isOutline) {
      return styles['primary-outline']
    }
    return styles.primary
  }
  if (type === ButtonTypes.Secondary) {
    if (isOutline) {
      return styles['secondary-outline']
    }
    return styles.secondary
  }
  if (type === ButtonTypes.Danger) {
    if (isOutline) {
      return styles['danger-outline']
    }
    return styles.danger
  }
  if (type === ButtonTypes.Warning) {
    if (isOutline) {
      return styles['warning-outline']
    }
    return styles.warning
  }
  if (type === ButtonTypes.Success) {
    if (isOutline) {
      return styles['success-outline']
    }
    return styles.success
  }
  if (type === ButtonTypes.Accent) {
    if (isOutline) {
      return styles['accent-outline']
    }
    return styles.accent
  }

  if (isOutline) {
    return styles['primary-outline']
  }

  return styles.primary
}

export function Button(props: PropsWithChildren<ButtonProps>): JSX.Element {
  const { title, onClick, children, bType = ButtonTypes.Primary, outline = false, wide, className,  ...rest } = props

  return (
    <button
      className={cn(
        styles['click-animation'],
        styles.base,
        getColor(bType, outline),
        {
          [styles.wide]: wide,
        },
        className,
      )}
      onClick={onClick}
      {...rest}
    >
      {children ? children : title}
    </button>
  )
}