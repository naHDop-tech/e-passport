import { ResetPasswordDLC } from '@components/ResetPassword'

import { IResetPasswordData } from '@root/interfaces/user'

export function ResetPasswordPage() {
  const submitHandler = (data: IResetPasswordData) => {
    console.log(data)
  }

  return (
    <ResetPasswordDLC onSubmit={submitHandler} />
  )
}
