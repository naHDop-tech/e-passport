import { PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'

import s from './MainLayoutStyle.module.css'
const styles = s as unknown as IMainLayoutStyle

interface IMainLayoutStyle {
  BaseGridContainer: string
  UserGridContainer: string
  Header: string
  Content: string
  Footer: string
  Sidebar: string
  SilentSidebar: string
}

import { ThemeToggle as TT } from '../../ThemeToggle'
import { withTheme } from '../../HOC/WithTheme'
import { Button, ButtonTypes } from '../../Button'
import { IMainLayoutProps } from './types'

const ThemeToggle = withTheme(TT)

export function MainLayout(props: PropsWithChildren<IMainLayoutProps>) {
  const { children, isAuth, sider, userEmail } = props
  const navigateTo = useNavigate()
  const Sider = sider

  return (
    <div className={isAuth ? styles.UserGridContainer : styles.BaseGridContainer}>
      <div className={styles.Header}>
        <ThemeToggle />
      </div>
      <div className={isAuth ? styles.Sidebar : styles.SilentSidebar}>
        <Sider />
      </div>
      <div className={styles.Content}>
        {children}
        <div className={styles.Footer}>
          {new Date().getFullYear()}
        </div>
      </div>
  </div>
  )
}
