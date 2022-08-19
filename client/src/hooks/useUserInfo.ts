import { useRecoilValue } from 'recoil'
import { authSelector, userSelector } from '../store/auth/selector'

export interface IUseUserInfo {
  isAuth: boolean
  userEmail: string
}

export function useUserInfo(): IUseUserInfo {
  const { isAuth } = useRecoilValue(authSelector)
  const { user: { email } } = useRecoilValue(userSelector)

  return {
    isAuth,
    userEmail: email
  }
}
