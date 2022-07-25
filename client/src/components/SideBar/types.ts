import { SvgComponent } from '../../components/types'
import { IItemProps, Item } from './Item'
import { ReactComponent as FingerPrintIcon } from '../../../src/img/svg/finger-print.icon.svg'

export interface IItem {
  id: string
  component: (props: IItemProps) => JSX.Element
  title: string
  logo: SvgComponent
  isDisabled?: boolean
}

export const items: IItem[] = [
  {
    id: 'k2j3h4e',
    title: 'search',
    component: Item,
    logo: FingerPrintIcon,
  },
  {
    id: 'l23k4j2',
    title: 'main',
    component: Item,
    logo: FingerPrintIcon,
  },
  {
    id: 'kj2435kj',
    title: 'setting',
    component: Item,
    logo: FingerPrintIcon,
  }
]