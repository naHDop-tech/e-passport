import { PropsWithChildren } from 'react'
import { useLocation } from 'react-router-dom'
import { MainLayoutGrid } from '../../layouts/MainLayout/MainLayoutGrid'
import { BaseHeader } from '../../Header'
import { CustomerHeader } from '../../Header'
import { withTheme } from '../WithTheme'
import { ThemeToggle as TT } from '../../../components/ThemeToggle'
import { IUseUserInfo } from '../../../hooks/useUserInfo'

const ThemeToggle = withTheme(TT)

export function withLayout(props: IUseUserInfo) {
  return (p: PropsWithChildren<{}>) => {
    const { isAuth } = props
    const { children } = p
    const { pathname } = useLocation()
  
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
  
    const footer = () => (
      <div>
        {new Date().getFullYear()}
      </div>
    )
  
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
      </MainLayoutGrid>
    )
  }
}
