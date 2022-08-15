import { PropsWithChildren } from 'react'
import { useRecoilValue } from 'recoil'
import { authSelector, userSelector } from '../../../store/auth/selector'
import { IMainLayoutProps } from '../../layouts/MainLayout/types'

export function withUserInfo(Component: (p: PropsWithChildren<IMainLayoutProps>) => JSX.Element) {
  return (props: PropsWithChildren<{}>) => {
    const { children } = props
    const { isAuth } = useRecoilValue(authSelector)
    const { user: { email } } = useRecoilValue(userSelector)
    const sider = () => (
      <>
        <p>Hello</p>
        <p>Setting</p>
        <p>Some</p>
        <p>Logout</p>
      </>
    )
    return (
      <Component sider={sider} isAuth={isAuth} userEmail={email}>
        {children}
      </Component>
    )
  };
}