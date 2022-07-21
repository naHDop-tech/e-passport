import { MouseEventHandler, PropsWithChildren, ButtonHTMLAttributes } from 'react'

import s from './Button.module.css'
const styles = s as unknown as IStyle

interface IStyle {
  primary: string
}

interface IAdditionProps {
  onClick: MouseEventHandler<HTMLButtonElement>
  title?: string
}

export type ButtonProps = IAdditionProps & ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: PropsWithChildren<ButtonProps>):JSX.Element {
  const { title, onClick, children, ...rest } = props

  return (
    <button className={styles.primary} onClick={onClick} {...rest}>{children ? children : title}</button>
  )
}
