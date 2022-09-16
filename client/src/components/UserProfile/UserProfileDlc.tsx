import { ChangeEvent, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { userSelector } from '@store/auth/selector'
import { IUserProfile } from '@root/interfaces/user'
import { useUserProfileValidator } from '@hooks/validation/useUserProfileValidator'

import { UserProfile } from './ui/UserProfile'

export function UserProfileDlc() {
  const [userProfile, setUserProfile] = useState<Partial<IUserProfile>>({})
  const errors = useUserProfileValidator(userProfile)
  const { user } = useRecoilValue(userSelector)

  const saveHandler = () => {
    console.log(userProfile);
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
