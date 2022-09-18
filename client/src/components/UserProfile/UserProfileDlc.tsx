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
  const [userProfile, setUserProfile] = useState<Partial<IUserProfile>>({})
  const errors = useUserProfileValidator(userProfile)
  const [user, setUserInfo] = useRecoilState(userInfo)
  const toast = useToast()
  const fetchedUser = useRecoilValue(fetchUser)

  useEffect(() => {
    if (fetchedUser) {
      setUserInfo(fetchedUser)
    }
  }, [fetchedUser])

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
      user={user}
    />
  )
}
