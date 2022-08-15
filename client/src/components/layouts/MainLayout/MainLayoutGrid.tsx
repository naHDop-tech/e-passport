import s from './MainLayoutGridStyle.module.css'
const styles = s as unknown as IMainLayoutStyle

interface IMainLayoutStyle {
  GridContainer: string
  Header: string
  Content: string
  Footer: string
  Sidebar: string
  Navbar: string
  Adv: string
}

export function MainLayoutGrid(props: any) {
  const { children, isAuth, sidebar, header, navbar,  userEmail } = props
  const Sidebar = sidebar
  const Navbar = navbar
  const Header = header

  return (
    <div className={styles.GridContainer}>
      <header className={styles.Header}>
        <Header />
      </header>
      <nav className={styles.Navbar}>
        <Navbar />
      </nav>
      <article className={styles.Content}>
        {children}
      </article>
      <aside className={styles.Sidebar}>
        <Sidebar />
      </aside>
      <div className={styles.Adv}>Advertising</div>
      <footer className={styles.Footer}>The footer</footer>
    </div>
  )
}
