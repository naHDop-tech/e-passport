import { GenericDropdownItemProps } from '@components/Dropdown/types'

export const USER_MENU: GenericDropdownItemProps[] = [
  {
    title: 'Settings',
    routePath: 'dashboard/settings',
  },
  {
    title: 'Update',
    routePath: 'dashboard/update',
  },
  {
    title: 'Logout',
    routePath: 'logout',
  }
]