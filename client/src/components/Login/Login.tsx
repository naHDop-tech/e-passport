import { TextInput } from '../Inputs/TextInput'
import { PasswordInput } from '../Inputs/PasswordInput'
import { Button } from '../Button'

export function Login() {
  return (
    <>
      <TextInput label='Email' placeholder='i.e. john-doe@gmail.com' />
      <PasswordInput label='Password' placeholder='i.e. "j9coEi30r#ZL"' />
      <br />
      <Button>Login</Button>
      <Button outline>Reset</Button>
    </>
  )
}
