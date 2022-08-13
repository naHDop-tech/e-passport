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
  Base: string
  ClickAnimation: string
  Primary: string
  Secondary: string
  Danger: string
  Warning: string
  Success: string
  Accent: string
  Outline: string
  PrimaryOutline: string
  SecondaryOutline: string
  DangerOutline: string
  WarningOutline: string
  SuccessOutline: string
  AccentOutline: string
  Wide: string
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
      return styles.PrimaryOutline
    }
    return styles.Primary
  }
  if (type === ButtonTypes.Secondary) {
    if (isOutline) {
      return styles.SecondaryOutline
    }
    return styles.Secondary
  }
  if (type === ButtonTypes.Danger) {
    if (isOutline) {
      return styles.DangerOutline
    }
    return styles.Danger
  }
  if (type === ButtonTypes.Warning) {
    if (isOutline) {
      return styles.WarningOutline
    }
    return styles.Warning
  }
  if (type === ButtonTypes.Success) {
    if (isOutline) {
      return styles.SuccessOutline
    }
    return styles.Success
  }
  if (type === ButtonTypes.Accent) {
    if (isOutline) {
      return styles.AccentOutline
    }
    return styles.Accent
  }

  if (isOutline) {
    return styles.PrimaryOutline
  }

  return styles.Primary
}

export function Button(props: PropsWithChildren<ButtonProps>): JSX.Element {
  const { title, onClick, children, bType = ButtonTypes.Primary, outline = false, wide, className,  ...rest } = props

  return (
    <button
      className={cn(
        styles.ClickAnimation,
        styles.Base,
        getColor(bType, outline),
        {
          [styles.Wide]: wide,
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