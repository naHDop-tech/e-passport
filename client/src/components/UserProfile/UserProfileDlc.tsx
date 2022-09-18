import { ChangeEvent, useState, useEffect } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'

import { fetchUser } from '@store/auth/selector'
import { userInfo } from '@store/auth/atoms'
import { IUserProfile } from '@root/interfaces/user'

import { useUserProfileValidator } from '@hooks/validation/useUserProfileValidator'
import { useToast } from '@hooks/useToast'
import { ToastType } from '@components/Toast/Toast'

import { UserProfile } from './ui/UserProfile'

export function UserProfileDlc() {
  const [userProfileForm, setUserProfileForm] = useState<Partial<IUserProfile>>({})
  const errors = useUserProfileValidator(userProfileForm)
  const [user, setUserInfo] = useRecoilState(userInfo)
  const toast = useToast()
  const fetchedUser = useRecoilValue(fetchUser)

  useEffect(() => {
    if (fetchedUser) {
      setUserInfo(fetchedUser)
    }
  }, [fetchedUser])

  const saveHandler = () => {
    console.log(userProfileForm);
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
