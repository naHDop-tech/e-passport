import { useResetRecoilState } from 'recoil'

import { userInfo, token } from '@store/auth/atoms'

import { Logout } from '@components/Logout'

export function LogoutPage() {
  const resetToken = useResetRecoilState(token)
  const resetUserInfo = useResetRecoilState(userInfo)

  const logoutHandler = () => {
    resetToken()
    resetUserInfo()
  }

  return <Logout onLogout={logoutHandler} />
}
