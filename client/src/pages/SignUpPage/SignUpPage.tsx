import { SignUpDLC } from '@components/SignUp'
import { ISignUpFormData } from '@root/interfaces/user'

export function SignUpPage() {
  const submitHandler = (data: ISignUpFormData) => {
    console.log(data)
  }

  return (
    <SignUpDLC onSubmit={submitHandler} />
  )
}
