import { PropsWithChildren } from 'react'
import { useRecoilValue } from 'recoil'
import { authSelector, userSelector } from '../../../store/auth/selector'
import { IMainLayoutProps } from '../../layouts/MainLayout/types'
import { ThemeToggle as TT } from '../../ThemeToggle'
import { withTheme } from '../../HOC/WithTheme'

const ThemeToggle = withTheme(TT)

export function withUserInfo(Component: (p: PropsWithChildren<IMainLayoutProps>) => JSX.Element) {
  return (props: PropsWithChildren<{}>) => {
    const { children } = props
    const { isAuth } = useRecoilValue(authSelector)
    const { user: { email } } = useRecoilValue(userSelector)
    
    const navbar = () => (
      <>
        <p>Hello</p>
        <p>Setting</p>
        <p>Some</p>
        <p>Logout</p>
      </>
    )
    const sidebar = () => (
      <>
        <p>ksfjghkhkh</p>
        <p>dflgkj3l4k5v</p>
        <p>dflkgjl45kt</p>
        <p>dlfkgl45klvt5</p>
        <p>dlfkgl45klvt5</p>
        <p>l45</p>
        <p>dlfkgl45klvt5</p>
      </>
    )
    const header = () => (
      <>
        <ThemeToggle />
      </>
    )

    return (
      <Component navbar={navbar} header={header} sidebar={sidebar} isAuth={isAuth} userEmail={email}>
        {children}
      </Component>
    )
  };
}