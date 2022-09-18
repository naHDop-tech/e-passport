import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { fetchUser } from '@store/auth/selector'
import { userInfo } from '@store/auth/atoms'
import { authSelector } from '@store/auth/selector'

import { IUserProfile } from '@root/interfaces/user'

export interface IUseUserInfo {
  isAuth: boolean
  user: Partial<IUserProfile>
}

export function useUserInfo(): IUseUserInfo {
  const { isAuth } = useRecoilValue(authSelector)
  const user = useRecoilValue(userInfo)

  return {
    isAuth,
    user,
  }
}
