import { atom } from 'recoil'
import { localStorageEffect } from '@store/effect'

export const ITEMS = Object.freeze([
  {
    id: 1,
    title: 'Home',
    url: '/'
  },
  {
    id: 2,
    title: 'About Product',
    url: '/about'
  },
  {
    id: 3,
    title: 'Contact',
    url: '/contact'
  },
  {
    id: 4,
    title: 'Sign In',
    url: '/sign-in'
  },
])

export const headerItems = atom({
  key: 'headerItems',
  default: ITEMS,
})

export const activeItemId = atom({
  key: 'activeItem',
  default: 1,
  effects: [
    localStorageEffect('active_header_item')
  ]
})

export const menuOpenStatus = atom({
  key: 'menuOpenStatus',
  default: false,
})