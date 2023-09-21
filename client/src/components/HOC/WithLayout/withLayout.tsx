import { PropsWithChildren } from 'react'
import { useLocation } from 'react-router-dom'

import { MainLayout } from '@components/layouts/MainLayout'
import { BaseHeader } from '@components/Header'
import { CustomerHeaderDLC } from '@components/Header'
import { useUserInfo } from '@hooks/useUserInfo'
import { withTheme } from '@components/HOC/WithTheme'
import { ThemeToggle as TT } from '@components/ThemeToggle'
import { Footer } from '@components/Footer'
import { NavbarDlc } from '@components/Navbar'

import { useActiveItem } from '@hooks/useActiveItem'

const ThemeToggle = withTheme(TT)

export function withLayout() {
  return (props: PropsWithChildren<{}>) => {
    const { children } = props
    const isAuth = localStorage.getItem("accessToken")
    const setActiveItem = useActiveItem()

    const sidebar = () => (
      <>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque, provident.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi veritatis ipsam asperiores accusantium!</p>
      </>
    )
  
    const header = () => !isAuth ? <BaseHeader /> : <CustomerHeaderDLC />
  
    const navbar = () => <NavbarDlc />
  
    const footer = () => <Footer onNavigate={setActiveItem} />
  
    const ad = () => (
      <div>
        <p>Lorem ipsum dolor sit.</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem, ipsum dolor.</p>
      </div>
    )
  
    return (
      <MainLayout
        ad={ad}
        footer={footer}
        navbar={navbar}
        header={header}
        sidebar={sidebar}
        isAuth={!!isAuth}
      >
        {children}
        <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
          <ThemeToggle />
        </div>
      </MainLayout>
    )
  }
}
