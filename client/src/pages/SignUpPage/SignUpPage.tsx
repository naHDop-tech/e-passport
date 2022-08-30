import { useNavigate } from 'react-router-dom'

import { SignUpDLC } from '@components/SignUp'

export function SignUpPage() {
  const navigateTo = useNavigate()

  const submitHandler = () => {
    navigateTo('/sign-in')
  }

  return (
    <SignUpDLC onSubmit={submitHandler} />
  )
}
