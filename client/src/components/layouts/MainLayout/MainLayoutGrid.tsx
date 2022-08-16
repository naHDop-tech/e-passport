import { PropsWithChildren } from 'react'

import s from './MainLayoutGridStyle.module.css'
const styles = s as unknown as IMainLayoutStyle

interface IMainLayoutStyle {
  UserGridContainer: string
  BaseGridContainer: string
  Header: string
  Content: string
  Footer: string
  HideFooter: string
  Sidebar: string
  HideSidebar: string
  Navbar: string
  HideNavbar: string
  Adv: string
  HideAdv: string
}

import { IMainLayoutProps } from './types'

export function MainLayoutGrid(props: PropsWithChildren<IMainLayoutProps>) {
  const { children, isAuth, sidebar, header, navbar, footer, ad } = props
  const Sidebar = sidebar
  const Navbar = navbar
  const Header = header
  const Footer = footer
  const Advertising = ad

  return (
    <div className={isAuth ? styles.UserGridContainer : styles.BaseGridContainer}>
      <header className={styles.Header}>
        <Header />
      </header>
      <nav className={isAuth ? styles.Navbar : styles.HideNavbar}>
        <Navbar />
      </nav>
      <article className={styles.Content}>
        {children}
        <footer className={!isAuth ? styles.Footer : styles.HideFooter}>
          <Footer />
        </footer>
      </article>
      <aside className={isAuth ? styles.Sidebar : styles.HideSidebar}>
        <Sidebar />
      </aside>
      <div className={isAuth ? styles.Adv : styles.HideAdv}>
        <Advertising />
      </div>
    </div>
  )
}
