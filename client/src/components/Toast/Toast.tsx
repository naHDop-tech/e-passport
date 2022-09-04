import cn from 'classnames'

// import { Button } from '@components/Button'
import { useTimeout } from '@hooks/useTimeout'

import s from './ToastStyle.module.css'
const styles = s as ToastStyles

interface ToastStyles {
  Box: string

  Success: string
  Warning: string
  Error: string
  Info: string

  TopRight: string
  BottomRight: string
  TopLeft: string
  BottomLeft: string
}

export enum ToastType {
  Success = 'success',
  Error = 'error',
  Warning = 'danger',
  Info = 'info',
}

export enum ToastPosition {
  TopRight = 'TopRight',
  BottomRight = 'BottomRight',
  TopLeft = 'TopLeft',
  BottomLeft = 'BottomLeft',
}

export interface IToastProps {
  content: string
  close?: () => void
  type?: ToastType
  position?: ToastPosition
}

const getColor = (type: ToastType): string => {
  if (type === ToastType.Error) {
    return styles.Error
  }
  if (type === ToastType.Warning) {
    return styles.Warning
  }
  if (type === ToastType.Success) {
    return styles.Success
  }

  return styles.Info
}

const getPosition = (position: ToastPosition): string => {
  if (position === ToastPosition.TopLeft) {
    return styles.TopLeft
  }
  if (position === ToastPosition.BottomLeft) {
    return styles.BottomLeft
  }
  if (position === ToastPosition.BottomRight) {
    return styles.BottomRight
  }

  return styles.TopRight
}


export function Toast(props: IToastProps) {
  const { content, close, type = ToastType.Info, position = ToastPosition.TopRight } = props
  if (close) {
    useTimeout(close, 5000);
  }

  return (
    <div className={cn(styles.Box, getColor(type), getPosition(position))}>
      <div>
        {content}
        {/* <Button onClick={close} title="X" outline /> */}
      </div>
    </div>
  )
}
