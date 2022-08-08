import { atom } from 'recoil'
import { localStorageEffect } from './effect'

export const token = atom({
  key: 'token',
  default: '',
  effects: [
    localStorageEffect('token')
  ]
})

export const userInfo = atom({
  key: 'userInfo',
  default: {
    email: '',
    firstName: '',
    lastName: ''
  },
  effects: [
    localStorageEffect('user')
  ]
})