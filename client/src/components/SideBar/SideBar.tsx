
import { useState } from 'react'

import s from './SideBar.module.css'
import { Item } from './Item'
import { IItem } from './types'
import { ReactComponent as FingerPrintIcon } from '../../../src/img/svg/finger-print.icon.svg'
const styles = s as unknown as ISideBarStyle

interface ISideBarStyle {
  title: string
  navContent: string
  wrapper: string
}

export type SideBarProps = {
  items: IItem[]
}

export function SideBar(props: SideBarProps): JSX.Element {
  const { items } = props
  const [activeId, setActiveId] = useState<string>()

  const handler = (id: string) => {
    setActiveId(id);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>

      </div>
      <div className={styles.navContent}>
        {items.map((item) => {
          const { component: Component, id, title, logo } = item;
          return (
            <>
              <Component logo={logo} title={title} onClick={() => handler(id)} isActive={activeId === id} />
            </>
          )
        })}
      </div>
      <Item staticColor="--color-accent" logo={FingerPrintIcon} title='Logout' />
      <Item logo={FingerPrintIcon} title='Contact us' />
    </div>
  )
}
