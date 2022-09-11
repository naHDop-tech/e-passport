import { atom } from 'recoil'
import { localStorageEffect } from '@store/effect'

import SettingsIcon from '@static/icons/settings-icon.svg'
import DashboardIcon from '@static/icons/dashboard-icon.svg'
import FingerPrintIcon from '@static/icons/fingerprint-icon.svg'
import PassportIcon from '@static/icons/passport-icon.svg'

export const ITEMS = Object.freeze([
  {
    id: 1,
    title: 'Dashboard',
    url: '/dashboard',
    icon: DashboardIcon,
  },
  {
    id: 2,
    title: 'My passport',
    url: '/dashboard/passport',
    icon: PassportIcon,
  },
  {
    id: 3,
    title: 'Fingerprint',
    url: '/dashboard/fingerprint',
    icon: FingerPrintIcon,
  },
  {
    id: 4,
    title: 'Settings',
    url: '/dashboard/settings',
    icon: SettingsIcon,
  },
])

export const dashboardItems = atom({
  key: 'dashboardItems',
  default: ITEMS,
})

export const activeItemId = atom({
  key: 'dashboardActiveItem',
  default: 0,
  effects: [
    localStorageEffect('active_dashboard_item')
  ]
})
