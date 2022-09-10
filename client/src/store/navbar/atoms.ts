import { atom } from 'recoil'
import { localStorageEffect } from '@store/effect'

export const deleteAccountItem = {
  id: 5,
  title: 'Delete Account',
  url: '/dashboard/settings/delete-account'
}

export const ITEMS = Object.freeze([
  {
    id: 1,
    title: 'My profile',
    url: '/dashboard/settings/profile'
  },
  {
    id: 2,
    title: 'Preferences',
    url: '/dashboard/settings/preferences'
  },
  {
    id: 3,
    title: 'Notification',
    url: '/dashboard/settings/notification'
  },
  {
    id: 4,
    title: 'Security',
    url: '/dashboard/settings/security'
  },
])

export const navbarItems = atom({
  key: 'navbarItems',
  default: ITEMS,
})

export const activeItemId = atom({
  key: 'navbarActiveItem',
  default: 1,
  effects: [
    localStorageEffect('active_navbar_item')
  ]
})
