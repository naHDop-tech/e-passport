import { Navbar } from './Navbar'

export function NavbarDlc() {
  const navigationHandler = (item: any) => {
    console.log(item);
  }

  return (
    <Navbar onNavigate={navigationHandler} />
  )
}
