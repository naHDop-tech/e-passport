import { PropsWithChildren } from 'react'
import { useRecoilValue } from 'recoil'
import { authSelector, userSelector } from '../../../store/auth/selector'
import { IMainLayoutProps } from '../../layouts/MainLayout/types'

export function withUserInfo(Component: (p: PropsWithChildren<IMainLayoutProps>) => JSX.Element) {
  return (props: PropsWithChildren<{}>) => {
    const { children } = props
    const { isAuth } = useRecoilValue(authSelector)
    const { user: { email } } = useRecoilValue(userSelector)

    return (
      <Component isAuth={isAuth} userEmail={email}>
        {children}
      </Component>
    )
  };
}