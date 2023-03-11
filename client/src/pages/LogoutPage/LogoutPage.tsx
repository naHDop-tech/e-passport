import { Logout } from '@components/Logout'

export function LogoutPage() {

  const logoutHandler = () => {
    localStorage.setItem('accessToken', '')
    localStorage.setItem('userId', '')
  }

  return <Logout onLogout={logoutHandler} />
}
