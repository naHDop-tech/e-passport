import { useUserInfo } from '@hooks/useUserInfo'
import { Navigate, Route } from 'react-router-dom'

import { IGuardRouteDlcProps } from './GuardRouteDlc'

enum UserAuthStatus {
  Login,
  Logout,
  Unset,
}

export function GuardRoute(props: IGuardRouteDlcProps) {
  const { authPath, ...rest } = props
  const authStatus = useUserAuthStatus()

  if (authStatus === UserAuthStatus.Logout) {
    return <Navigate to={`${authPath}`} replace />
  }

  return <Route {...rest} />
}

function useUserAuthStatus(): UserAuthStatus {
  const { isAuth } = useUserInfo()

  return isAuth ? UserAuthStatus.Login : UserAuthStatus.Logout
}