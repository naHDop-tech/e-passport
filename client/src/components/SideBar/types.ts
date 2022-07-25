import { SvgComponent } from '../../components/types'
import { IItemProps, Item } from './Item'

import { ReactComponent as HubIcon } from '../../../src/img/svg/hub.icon.svg'
import { ReactComponent as SettingsIcon } from '../../../src/img/svg/settings.icon.svg'
import { ReactComponent as PassportIcon } from '../../../src/img/svg/passport.icon.svg'

export interface IItem {
  id: string
  component: (props: IItemProps) => JSX.Element
  title: string
  logo: SvgComponent
  isDisabled?: boolean
}

export const items: IItem[] = [
  {
    id: '1',
    title: 'Hub',
    component: Item,
    logo: HubIcon,
  },
  {
    id: '2',
    title: 'Settings',
    component: Item,
    logo: SettingsIcon,
  },
  {
    id: '3',
    title: 'Passport',
    component: Item,
    logo: PassportIcon,
  }
]