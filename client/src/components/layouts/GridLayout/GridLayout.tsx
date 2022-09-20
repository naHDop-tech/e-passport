import { PropsWithChildren } from 'react'

import s from './GridLayoutStyle.module.css'
const styles = s as unknown as IGridLayoutStyle

interface IGridLayoutStyle {
  Box: string
}

export function GridLayout(props: PropsWithChildren) {
  const { children } = props

  return (
    <div className={styles.Box}>
      {children}
    </div>
  )
}
