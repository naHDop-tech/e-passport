import { SvgComponent } from "@root/components/Dropdown/types"

export interface IItem {
  Id: number
  Title: string
  Url: string
  Icon?: SvgComponent
}

export enum HomeItem {
  Id = 1,
  Title = 'Home',
  Url = '/'
}
export enum AboutItem {
  Id = 2,
  Title = 'About product',
  Url = '/about'
}
export enum ContactItem {
  Id = 3,
  Title = 'Contact',
  Url = '/contact'
}
export enum SignInItem {
  Id = 4,
  Title = 'Sign In',
  Url = '/sign-in'
}
export enum DeleteItem {
  Id = 5,
  Title = 'Delete account',
  Url = '/dashboard/settings/delete-account'
}
export enum ProfileItem {
  Id = 6,
  Title = 'My profile',
  Url = '/dashboard/settings/profile'
}
export enum PreferencesItem {
  Id = 7,
  Title = 'Preferences',
  Url = '/dashboard/settings/preferences'
}
export enum NotificationItem {
  Id = 8,
  Title = 'Notification',
  Url = '/dashboard/settings/notification'
}
export enum SecurityItem {
  Id = 9,
  Title = 'Security',
  Url = '/dashboard/settings/security'
}
export enum DashboardItem {
  Id = 10,
  Title = 'Dashboard',
  Url = '/dashboard',
}
export enum PassportItem {
  Id = 11,
  Title = 'My passport',
  Url = '/dashboard/passport'
}
export enum FingerprintItem {
  Id = 12,
  Title = 'Fingerprint',
  Url = '/dashboard/fingerprint'
}
export enum SettingsItem {
  Id = 13,
  Title = 'Settings',
  Url = '/dashboard/settings'
}
export enum LogoutItemItem {
  Id = 14,
  Title = 'Logout',
  Url = '/logout'
}
