import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { token } from '@store/auth/atoms'
import { SignInDLC } from '@root/components/SignIn/SignInDLC'

export function SignInPage() {
  const navigateTo = useNavigate()
  const [_, setToken] = useRecoilState(token)

  const submitFormHandler = (token: string) => {
    setToken(token)
    navigateTo('/dashboard')
  }

  return <SignInDLC onSubmit={submitFormHandler} />
}
