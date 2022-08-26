import { SignInDLC } from '@root/components/SignIn/SignInDLC'
import { ISignInFormData } from '@root/interfaces/user'

export function SignInPage() {
  const submitFormHandler = (data: ISignInFormData) => {
    console.log(data);
  }

  return <SignInDLC onSubmit={submitFormHandler} />
}
