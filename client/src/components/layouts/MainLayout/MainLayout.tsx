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
  Navbar: string
  SilentNavbar: string
}

import { IMainLayoutProps } from './types'

export function MainLayout(props: PropsWithChildren<IMainLayoutProps>) {
  const { children, isAuth, sidebar, header, navbar } = props
  const navigateTo = useNavigate()
  const Sidebar = sidebar
  const Navbar = navbar
  const Header = header

  return (
    <div className={isAuth ? styles.UserGridContainer : styles.BaseGridContainer}>
      <div className={styles.Header}>
        <Header />
      </div>
      <div className={isAuth ? styles.Navbar : styles.SilentNavbar}>
        <Navbar />
      </div>
      <div className={styles.Content}>
        {children}
        <div className={styles.Footer}>
          {new Date().getFullYear()}
        </div>
      </div>
      <div className={isAuth ? styles.Sidebar : styles.SilentSidebar}>
        <Sidebar />
      </div>
  </div>
  )
}
