import s from './NavbarStyle.module.css'
const styles = s as unknown as INavbarStyle

interface INavbarStyle {
  Box: string
  Header: string
  Navigation: string
  BottomAction: string
}

export interface INavbarProps {
  header: () => JSX.Element
  navigation: () => JSX.Element
  bottomAction: () => JSX.Element
}

export function Navbar(props: INavbarProps) {
  const { header: Header, navigation: Navigate, bottomAction: BottomAction } = props
  return (
    <div className={styles.Box}>
      <div className={styles.Header}>
        <Header />
      </div>
      <div className={styles.Navigation}>
        <Navigate />
      </div>
      <div className={styles.BottomAction}>
        <BottomAction />
      </div>
    </div>
  )
}
