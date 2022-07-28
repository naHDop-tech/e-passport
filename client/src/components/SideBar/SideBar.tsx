
import { useState } from 'react'

import s from './SideBar.module.css'
import { Item } from './Item'
import { IItem } from './types'
import { ReactComponent as SignInIcon } from '../../../src/img/svg/signin.icon.svg'
const styles = s as unknown as ISideBarStyle

interface ISideBarStyle {
  title: string
  'nav-content': string
  wrapper: string
  gap24: string
}

export type SideBarProps = {
  items: IItem[]
}

export function SideBar(props: SideBarProps): JSX.Element {
  const { items } = props
  const [activeItem, setActiveItem] = useState<IItem>()

  const handler = (item: IItem) => {
    setActiveItem(item);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>

      </div>
      <div className={styles['nav-content']}>
        <div className={styles.gap24}>
          {items.map((item) => {
            const { component: Component, id, title, logo } = item;
            return (
              <Component
                logo={logo}
                title={title}
                onClick={() => handler(item)}
                isActive={activeItem?.id === id}
              />
            )
          })}
        </div>
        <div>
          <Item staticColor="--color-primary" logo={SignInIcon} title='Signin' />
        </div>
      </div>
    </div>
  )
}
