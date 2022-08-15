export interface IMainLayoutProps {
  isAuth: boolean
  userEmail: string
  sidebar: () => JSX.Element
  navbar: () => JSX.Element
  header: () => JSX.Element
}