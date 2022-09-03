import { HTMLAttributes } from 'react'
import cn from 'classnames';

import s from './DropdownStyle.module.css'
const styles = s as unknown as IDropdownStyle
import { IGenericDropdownItemProps } from './types'

interface IDropdownStyle {
  Box: string
  Visible: string
}

interface IAdditionDropdownProps<T> {
  isOpen: boolean
  onSelect: (v: T) => void
  content: T[]
  component: (props: IGenericDropdownItemProps<T>) => JSX.Element
}

export type ButtonProps<T> = IAdditionDropdownProps<T> & Omit<HTMLAttributes<HTMLDivElement>, 'onSelect' | 'onClick'>

export function Dropdown<T>(props: ButtonProps<T>) {
  const { component: Component, content, isOpen, onSelect, className, ...rest} = props
  return (
    <div className={cn(styles.Box, {[styles.Visible]: isOpen}, className)} {...rest}>
      {content.map((item) => {
        return (
          <Component
            // disabled={}
            onClick={() => onSelect(item)}
          />
        )
      })}
    </div>
  )
}
