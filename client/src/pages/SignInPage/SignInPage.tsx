import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { token, userInfo } from '@store/auth/atoms'
import { SignInDLC } from '@root/components/SignIn/SignInDLC'

export function SignInPage() {
  const navigateTo = useNavigate()
  const setToken = useSetRecoilState(token)
  const setUserInfo = useSetRecoilState(userInfo)

  const submitFormHandler = (token: string, userId: string) => {
    setToken(token)
    // const info = parseToken(token)
    setUserInfo({
      id: userId
    })
    navigateTo('/dashboard')
  }

  return <SignInDLC onSubmit={submitFormHandler} />
}
