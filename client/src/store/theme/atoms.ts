import { atom } from 'recoil'
import { localStorageEffect } from '@store/effect'

export const isDarkMode = atom({
  key: 'themeMode',
  default: false,
  effects: [
    localStorageEffect('theme_mode')
  ]
})