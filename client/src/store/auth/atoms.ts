import { atom } from 'recoil'
import { localStorageEffect } from '@store/effect'
import { IUserProfile } from '@root/interfaces/user'

export const token = atom<string>({
  key: 'token',
  default: '',
  effects: [
    localStorageEffect('token'),
  ]
})

export const userInfo = atom<Partial<IUserProfile>>({
  key: 'userInfo',
  default: {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    imgSrc: '', // https://www.w3schools.com/howto/img_avatar.png
    birthDate: '',
    countryResident: '',

    // frontend only
    isDraft: true,
  },
  effects: [
    localStorageEffect('user'),
  ]
})
