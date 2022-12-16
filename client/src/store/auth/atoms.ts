import { atom } from 'recoil'
import { localStorageEffect } from '@store/effect'
import { IUserProfile, Sex } from '@root/interfaces/user'

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
    photo: {
      mimetype: '',
      filename: '',
      encoding: '',
    },
    birthDate: '',
    sex: Sex.Unset,
    nationality: '',

    // frontend only
    isDraft: true,
  },
  effects: [
    localStorageEffect('user'),
  ]
})
