export interface IMainLayoutProps {
  isAuth: boolean
  sidebar: () => JSX.Element
  navbar: () => JSX.Element
  header: () => JSX.Element
}