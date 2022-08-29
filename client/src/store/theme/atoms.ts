import { atom } from 'recoil'
import { localStorageEffect } from '@store/effect'

export const isDarkMode = atom({
  key: 'isDarkMode',
  default: false,
  effects: [
    localStorageEffect('is_dark_mode')
  ]
})