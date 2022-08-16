import { selector } from 'recoil'

import { token } from './atoms'
import { userInfo } from './atoms'

export const authSelector = selector({
  key: 'authState',
  get: ({ get }) => {
    const currentToken = get(token);

    return {
      token: currentToken,
      isAuth: !!currentToken,
     }
  },
})

export const userSelector = selector({
  key: 'userState',
  get: ({ get }) => {
    const currentUserInfo = get(userInfo);

    return {
      user: currentUserInfo
     }
  },
})