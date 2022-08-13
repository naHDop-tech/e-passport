import { PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'

import s from './MainLayoutStyle.module.css'
const styles = s as unknown as IMainLayoutStyle

interface IMainLayoutStyle {
  GridContainer: string
  Header: string
  Content: string
  Footer: string
}

import { ThemeToggle as TT } from '../../ThemeToggle'
import { withTheme } from '../../HOC/WithTheme'
import { Button, ButtonTypes } from '../../Button'
import { IMainLayoutProps } from './types'

const ThemeToggle = withTheme(TT)

export function MainLayout(props: PropsWithChildren<IMainLayoutProps>) {
  const { children, isAuth, userEmail } = props
  const navigateTo = useNavigate()

  return (
    <div className={styles.GridContainer}>
      <div className={styles.Header}>
        <ThemeToggle />
      </div>
      <div className={styles.Content}>
        {children}
      </div>
      <div className={styles.Footer}>
        {new Date().getFullYear()}
      </div>
    </div>
  )
}
