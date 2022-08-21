import { atom } from 'recoil'
import { localStorageEffect } from '../effect'

export const token = atom({
  key: 'token',
  default: 'asdd',
  effects: [
    localStorageEffect('token')
  ]
})

export const userInfo = atom({
  key: 'userInfo',
  default: {
    email: 'grigory@maroo.us', // TODO: get true info
    firstName: 'Greg', // TODO: get true info
    lastName: 'Tarasoff' // TODO: get true info
  },
  effects: [
    localStorageEffect('user')
  ]
})