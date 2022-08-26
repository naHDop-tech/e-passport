import { atom } from 'recoil'

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
})

export const menuOpenStatus = atom({
  key: 'menuOpenStatus',
  default: false,
})