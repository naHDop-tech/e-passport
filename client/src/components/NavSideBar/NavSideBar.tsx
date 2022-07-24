
import { useState } from 'react'

import s from './NavSideBar.module.css'

import { IItem } from './types'
const styles = s as unknown as INavSideBarStyle

interface INavSideBarStyle {
  title: string
  navContent: string
  wrapper: string
}

export type NavSideBarProps = {
  items: IItem[]
}

export function NavSideBar(props: NavSideBarProps): JSX.Element {
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
          const { component: Item, id } = item;
          return (
            <>
              <Item onClick={() => handler(id)} isActive={activeId === id} />
            </>
          )
        })}
      </div>
    </div>
  )
}

export function Foo(props: {onClick: () => void, isActive: boolean }) {
  const { onClick, isActive } = props

  return (
    <>
      <div onClick={onClick}>{`Element ${isActive}`}</div>
    </>
  )
}