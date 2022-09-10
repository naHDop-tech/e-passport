import { useResolveContent } from './hooks/useResolveContent'
import { Navbar } from './Navbar'

export function NavbarDlc() {
  const { header, navigation, bottomAction } = useResolveContent()

  return (
    <Navbar
      bottomAction={bottomAction}
      navigation={navigation}
      header={header}
    />
  )
}
