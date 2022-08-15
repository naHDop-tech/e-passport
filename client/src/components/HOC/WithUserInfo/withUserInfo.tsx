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
      <ul>
        <li><a href="">Nav 1</a></li>
        <li><a href="">Nav 2</a></li>
        <li><a href="">Nav 3</a></li>
      </ul>
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