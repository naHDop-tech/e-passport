import { PropsWithChildren } from 'react'
import { useLocation } from 'react-router-dom'

import { MainLayoutGrid } from '@components/layouts/MainLayout/MainLayoutGrid'
import { BaseHeader } from '@components/Header'
import { CustomerHeader } from '@components/Header'
import { useUserInfo } from '@hooks/useUserInfo'
import { withTheme } from '@components/HOC/WithTheme'
import { ThemeToggle as TT } from '@components/ThemeToggle'
import { Footer } from '@components/Footer'

import { useActiveItem } from '@hooks/useActiveItem'

const ThemeToggle = withTheme(TT)

export function withLayout() {
  return (props: PropsWithChildren<{}>) => {
    const { children } = props
    const { pathname } = useLocation()
    const { isAuth } = useUserInfo()
    const setActiveItem = useActiveItem()

    const sidebar = () => (
      <>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque, provident.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi veritatis ipsam asperiores accusantium!</p>
      </>
    )
  
    const header = () => !isAuth ? <BaseHeader /> : <CustomerHeader />
  
    const navbar = () => (
      <ul>
        <li><a href="">Nav 1</a></li>
        <li><a href="">Nav 2</a></li>
        <li><a href="">Nav 3</a></li>
      </ul>
    )
  
    const footer = () => <Footer onNavigate={setActiveItem} />
  
    const ad = () => (
      <div>
        <p>Lorem ipsum dolor sit.</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem, ipsum dolor.</p>
      </div>
    )
  
    return (
      <MainLayoutGrid
        ad={ad}
        footer={footer}
        navbar={navbar}
        header={header}
        sidebar={sidebar}
        isAuth={isAuth}
      >
        {children}
        <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
          <ThemeToggle />
        </div>
      </MainLayoutGrid>
    )
  }
}
