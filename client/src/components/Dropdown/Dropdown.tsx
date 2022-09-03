import { HTMLAttributes, PropsWithChildren, useState, useEffect, useRef } from 'react'
import cn from 'classnames';

import s from './DropdownStyle.module.css'
const styles = s as unknown as IDropdownStyle
import { GenericDropdownItemProps } from './types'

interface IDropdownStyle {
  Box: string
  Visible: string
  RelativeBlock: string
}

interface IAdditionDropdownProps {
  isOpen: boolean
  onSelect: (item: GenericDropdownItemProps) => void
  content: GenericDropdownItemProps[]
  component: (props: GenericDropdownItemProps) => JSX.Element
}

export type DropdownProps = IAdditionDropdownProps & Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'>

export function Dropdown(props: PropsWithChildren<DropdownProps>) {
  const {
    component: Component,
    content,
    onClick,
    isOpen,
    onSelect,
    children,
    className,
    ...rest
  } = props
  const [width, setWidth] = useState(0);
  const parentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(parentRef.current){
      setWidth(parentRef.current.offsetWidth)
    }
  }, [parentRef.current?.clientWidth]);

  return (
    <>
      <div ref={parentRef} onClick={onClick} className={styles.RelativeBlock}>
        {children}
      </div>
      <div style={{ width }} className={cn(styles.Box, {[styles.Visible]: isOpen}, className)} {...rest}>
        {content.map((item) => {
          return (
            <Component
              key={item.title}
              title={item.title}
              routePath={item.routePath}
              onClick={() => onSelect(item)}
            />
          )
        })}
      </div>
    </>
  )
}
