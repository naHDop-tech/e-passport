import { Button } from '@components/Button'

export interface ILogoutProps {
  onLogout: () => void
}

export  function Logout(props: ILogoutProps) {
  const { onLogout } = props

  return (
    <div>
      <Button outline onClick={onLogout}>Logout</Button>
    </div>
  )
}
