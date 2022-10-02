import { ChangeEvent, useState } from 'react'

import { IUserProfile } from '@root/interfaces/user'
import { useUserInfo } from '@hooks/useUserInfo'
import { useToast } from '@hooks/useToast'
import { ToastType } from '@components/Toast/Toast'

import { UserPhone } from './ui/phone/UserPhone'
import { useUserPhoneValidator } from '@root/hooks/validation/userUserPhoneValidator'

export function UserPhoneDlc() {
  const { user, fetchUserInfo } = useUserInfo()
  const [userProfileForm, setUserProfileForm] = useState<Partial<IUserProfile>>(user)
  const errors = useUserPhoneValidator(userProfileForm)
  const toast = useToast()

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserProfileForm((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      }
    })
  }

  const saveHandler = async () => {
    try {
      // nothing
      toast.open({ type: ToastType.Success, content: 'Your phone successfully changed' })
    } catch (err: any) {
      toast.open({ type: ToastType.Error, content: err.message })
    }
  }

  if (user.isDraft) {
    return null
  }

  return (
    <UserPhone
      errors={errors}
      user={user}
      changedUserFiled={userProfileForm}
      onChange={changeHandler}
      onSave={saveHandler}
    />
  )
}
