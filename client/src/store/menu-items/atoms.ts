import { atom } from 'recoil'
import { localStorageEffect } from '@store/effect'

import {
  HomeItem,
  AboutItem,
  SignInItem,
  DeleteItem,
  ContactItem,
  ProfileItem,
  PassportItem,
  SecurityItem,
  SettingsItem,
  DashboardItem,
  FingerprintItem,
  PreferencesItem,
  NotificationItem,
  LogoutItemItem,
} from './constants'

export const navItems = atom({
  key: 'navItems',
  default: {
    header: [
      HomeItem,
      AboutItem,
      ContactItem,
      SignInItem,
    ],
    settings: [
      ProfileItem,
      SecurityItem,
      PreferencesItem,
      NotificationItem
    ],
    dashboard: [
      DashboardItem,
      PassportItem,
      FingerprintItem,
      SettingsItem,
    ],
    userInfo: [
      DashboardItem,
      SettingsItem,
      PassportItem,
      LogoutItemItem,
      DeleteItem
    ]
  },
})

export const activeItemId = atom({
  key: 'activeItem',
  default: 0,
  effects: [
    localStorageEffect('active_item')
  ]
})
