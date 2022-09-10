import { Logo } from '@components/Logo'
import { Navbar } from './Navbar'

export function NavbarDlc() {
  const navigationHandler = (item: any) => {
    console.log(item);
  }

  const header = () => (
    <>
      <Logo />
      <div style={{ marginLeft: '10px' }}>Passport</div>
    </>
  )

  const navigation = () => (
    <>
      <p>Link1</p>
      <p>Link2</p>
      <p>Link3</p>
    </>
  )

  const bottomAction = () => (
    <p>Action</p>
  )

  return (
    <Navbar
      bottomAction={bottomAction}
      navigation={navigation}
      header={header}
    />
  )
}
