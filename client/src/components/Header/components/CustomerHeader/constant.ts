import { GenericDropdownItemProps } from '@components/Dropdown/types'

export const USER_MENU: GenericDropdownItemProps[] = [
  {
    title: 'Dashboard',
    url: 'dashboard',
  },
  {
    title: 'Settings',
    url: 'dashboard/settings',
  },
  {
    title: 'My passport',
    url: 'dashboard/passport',
  },
  {
    title: 'Logout',
    url: 'logout',
  },
  {
    title: 'Delete account',
    url: 'dashboard/settings/delete-account',
  }
]