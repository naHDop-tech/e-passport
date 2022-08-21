import { PropsWithChildren, InputHTMLAttributes } from 'react'
import cn from 'classnames';

import s from './MenuItemStyle.module.css'
const styles = s as unknown as IEIconStyle

interface IEIconStyle {
  Item: string
  Active: string
}

interface IMenuItemProps {
  isActive?: boolean
}

export type MenuItemType = IMenuItemProps & InputHTMLAttributes<HTMLDivElement>

export function MenuItem(props: PropsWithChildren<MenuItemType>) {
  const { children, isActive, ...rest } = props
  return (
    <div
      className={cn(styles.Item, {[styles.Active]: isActive})}
      {...rest}
    >
      {children}
    </div>
  )
}
