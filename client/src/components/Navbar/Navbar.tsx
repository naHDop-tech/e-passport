import { Item } from '@store/header/types'

import s from './NavbarStyle.module.css'
const styles = s as unknown as INavbarStyle

interface INavbarStyle {
  Box: string
  Header: string
  Navigation: string
  BottomAction: string
}

export interface INavbarProps {
  onNavigate: (item: any) => void
}

export function Navbar(props: INavbarProps) {
  return (
    <div className={styles.Box}>
      <div className={styles.Header}>
        <p>HH</p>
      </div>
      <div className={styles.Navigation}>
        <p className='foo'>Link1</p>
        <p>Link2</p>
        <p>Link3</p>
      </div>
      <div className={styles.BottomAction}>
        <p>Action</p>
      </div>
    </div>
  )
}
