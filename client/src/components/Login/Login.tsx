import { useReducer, ChangeEvent, useCallback } from 'react'

import { useLoginValidation } from '../../hooks/validation/useLoginValidation'

import { TextInput } from '../Inputs/TextInput'
import { PasswordInput } from '../Inputs/PasswordInput'
import { Button } from '../Button'

import { ILoginFormData } from '../../interfaces/user'
import { loginReducer } from './reducer/reducer'
import { Actions } from './reducer/state'

import s from './LoginStyle.module.css'
const styles = s as unknown as ILoginStyle

interface ILoginStyle {
  Box: string
  LeftContent: string
  RightContent: string
}
export interface ILoginProps {
  onSubmit: (data: ILoginFormData) => void
}

export function Login(props: ILoginProps): JSX.Element {
  const { onSubmit } = props

  const [
    { password, email, emailError, passwordError },
    dispatchLoginForm,
  ] = useReducer(loginReducer, { email: '', password: '' })

  const loginFormValidate = useLoginValidation({ email, password })

  const submitFormHandler = () => {
    dispatchLoginForm({ type: Actions.ResetErrors })
    const validationResult = loginFormValidate()

    if (!validationResult.error) {
      onSubmit({ email, password })
    } else {
      if (!validationResult?.error?.details.length) {
        console.error('Unexpected error')
      }
      for (const error of validationResult?.error?.details) {
        if (error.path[0] === 'password') {
          console.log('PASS ERR', error.message);
          
          dispatchLoginForm({ type: Actions.SetPasswordError, payload: error.message })
        }
        if (error.path[0] === 'email') {
          console.log('EM ERR', error.message);
          
          dispatchLoginForm({ type: Actions.SetEmailError, payload: error.message })
        }
      }
    }
  }

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchLoginForm({ type: Actions.ChangeEmail, payload: e.target.value })
  }

  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchLoginForm({ type: Actions.ChangePassword, payload: e.target.value })
  }

  return (
    <div className={styles.Box}>
      <div className={styles.LeftContent}>
        {/* TODO: img */}
      </div>
      <div className={styles.RightContent}>
        <TextInput
          label='Email'
          placeholder='i.e. john-doe@gmail.com'
          onChange={changeEmailHandler}
          errorText={emailError}
        />
        <PasswordInput
          label='Password'
          placeholder='i.e. "j9coEi30r#ZL"'
          onChange={changePasswordHandler}
          errorText={passwordError}
        />
        <Button onClick={submitFormHandler}>Login</Button>
        <Button outline>Reset</Button>
      </div>
    </div>
  )
}
