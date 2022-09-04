import { GenericDropdownItemProps } from '@components/Dropdown/types'

export const USER_MENU: GenericDropdownItemProps[] = [
  {
    title: 'Settings',
    routePath: 'dashboard/settings',
  },
  {
    title: 'My passport',
    routePath: 'dashboard/passport',
  },
  {
    title: 'Logout',
    routePath: 'logout',
  }
]