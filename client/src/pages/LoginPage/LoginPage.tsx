import { LoginDLC } from '../../components/Login/LoginDLC'
import { ILoginFormData } from '../../interfaces/user'

export function LoginPage() {
  const submitFormHandler = (data: ILoginFormData) => {
    console.log(data);
  }

  return <LoginDLC onSubmit={submitFormHandler} />
}
