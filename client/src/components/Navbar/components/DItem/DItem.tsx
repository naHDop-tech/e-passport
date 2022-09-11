import { InputHTMLAttributes, PropsWithChildren } from 'react'
import cn from 'classnames'

import s from './DItemStyle.module.css'
const styles = s as unknown as IDItemStyle

interface IDItemStyle {
  Box: string
  Active: string
}

export interface IDItemProps {
  isActive?: boolean
}


export type DItemItemType = IDItemProps & InputHTMLAttributes<HTMLDivElement>

export function DItem(props: PropsWithChildren<DItemItemType>) {
  const { children, isActive, ...rest } = props

  return (
    <div
      className={cn(styles.Box, {[styles.Active]: isActive})}
      {...rest}
    >
      {children}
    </div>
  )
}
