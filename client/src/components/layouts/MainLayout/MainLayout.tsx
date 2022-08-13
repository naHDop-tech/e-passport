import { PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'

import { ThemeToggle as TT } from '../../ThemeToggle'
import { withTheme } from '../../HOC/WithTheme'
import { IMainLayoutProps } from './types'

const ThemeToggle = withTheme(TT)

export function MainLayout(props: PropsWithChildren<IMainLayoutProps>) {
  const { children, isAuth, userEmail } = props
  const navigateTo = useNavigate()

  return (
    <>
     <ThemeToggle />
      {children}
    </>
  )
}
