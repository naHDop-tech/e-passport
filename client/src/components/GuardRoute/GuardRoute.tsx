import { Navigate, Route } from 'react-router-dom'
import { PropsWithChildren } from 'react'

import { useUserInfo } from '@hooks/useUserInfo'

interface IGuardRouteProps {
  authPath?: string
}

export function GuardRoute(props: PropsWithChildren<IGuardRouteProps>): JSX.Element {
  const { authPath = '/sign-in', children } = props
  const isAuth = localStorage.getItem('accessToken')

  if (!isAuth) {
    return <Navigate to={`${authPath}`} replace />
  }

  return (
    <>
      {children}
    </>
  )
}
