import { ChangeEvent, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { userSelector } from '@store/auth/selector'
import { IUserProfile } from '@root/interfaces/user'

import { useUserProfileValidator } from '@hooks/validation/useUserProfileValidator'
import { useToast } from '@hooks/useToast'
import { ToastType } from '@components/Toast/Toast'

import { UserProfile } from './ui/UserProfile'

export function UserProfileDlc() {
  const [userProfile, setUserProfile] = useState<Partial<IUserProfile>>({})
  const errors = useUserProfileValidator(userProfile)
  const { user } = useRecoilValue(userSelector)
  const toast = useToast()

  const saveHandler = () => {
    console.log(userProfile);
    toast.open({ type: ToastType.Success, content: 'Your profiled has been saved' })
  }

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserProfile((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      }
    })
  }

  return (
    <UserProfile
      errors={errors}
      changedUserFiled={userProfile}
      onChange={changeHandler}
      onSave={saveHandler}
      email={user?.email}
      firstName={user.firstName}
      lastName={user.lastName}
      imgSrc={user.imgSrc}
    />
  )
}
