import { atom } from 'recoil'
import { localStorageEffect } from '@store/effect'

export const token = atom<string>({
  key: 'token',
  default: '',
  effects: [
    localStorageEffect('token')
  ]
})

export const userInfo = atom<Partial<IUser>>({
  key: 'userInfo',
  default: {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    imgSrc: '', // https://www.w3schools.com/howto/img_avatar.png
    birthDate: '',
    countryResident: ''
  },
  effects: [
    localStorageEffect('user')
  ]
})

export interface IUser {
  id: string
  email: string
  firstName: string
  lastName: string
  imgSrc: string
  birthDate: string
  countryResident: string
}