import { ChangeEvent, useState, useEffect } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'

import { fetchUser } from '@store/auth/selector'
import { userInfo } from '@store/auth/atoms'
import { IUserProfile } from '@root/interfaces/user'

import { useUserProfileValidator } from '@hooks/validation/useUserProfileValidator'
import { useToast } from '@hooks/useToast'
import { useUserInfo } from '@hooks/useUserInfo'
import { ToastType } from '@components/Toast/Toast'

import { UserProfile } from './ui/UserProfile'

export function UserProfileDlc() {
  const [userProfileForm, setUserProfileForm] = useState<Partial<IUserProfile>>({})
  const errors = useUserProfileValidator(userProfileForm)
  const toast = useToast()
  const { user, fetchUserInfo } = useUserInfo()

  useEffect(() => {
    if (user.id) {
      fetchUserInfo()
    }
  }, [user.id])

  const saveHandler = () => {
    console.log(userProfileForm);
    fetchUserInfo()
    toast.open({ type: ToastType.Success, content: 'Your profiled has been saved' })
  }

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserProfileForm((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      }
    })
  }

  return (
    <UserProfile
      errors={errors}
      changedUserFiled={userProfileForm}
      onChange={changeHandler}
      onSave={saveHandler}
      user={user}
    />
  )
}
