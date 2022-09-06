import { atom } from 'recoil'
import { localStorageEffect } from '@store/effect'

export const token = atom({
  key: 'token',
  default: 'ksdhjf',
  effects: [
    localStorageEffect('token')
  ]
})

export const userInfo = atom({
  key: 'userInfo',
  default: {
    email: 'grigory@maroo.us', // TODO: get true info
    firstName: 'Greg', // TODO: get true info
    lastName: 'Tarasoff', // TODO: get true info
    imgSrc: 'https://www.w3schools.com/howto/img_avatar.png', // TODO: get true info
  },
  effects: [
    localStorageEffect('user')
  ]
})

export interface IUser {
  email: string
  firstName: string
  lastName: string
  imgSrc: string
}