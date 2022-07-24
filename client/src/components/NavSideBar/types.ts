import { Foo } from './NavSideBar'

export interface IItem {
  id: string
  component: (props: {onClick: () => void, isActive: boolean }) => JSX.Element
  title: string
  isDisabled?: boolean
}

export const items: IItem[] = [
  {
    id: 'k2j3h4e',
    title: 'search',
    component: Foo
  },
  {
    id: 'l23k4j2',
    title: 'main',
    component: Foo
  },
  {
    id: 'kj2435kj',
    title: 'setting',
    component: Foo
  }
]