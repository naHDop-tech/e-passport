import { BrowserRouter as RouterProvider, Routes, Route } from 'react-router-dom'
import './style.css'

import { Login } from './components/Login'
import { withLayout } from './components/HOC/WithLayout'
import { useUserInfo } from './hooks/useUserInfo'

export function App(): JSX.Element {
  const userInfo = useUserInfo()
  const MainLayoutWrapper = withLayout(userInfo)

  return (
    <RouterProvider>
      <MainLayoutWrapper>
        <Routes>
          <Route path='/' element={<p>Hello</p>}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </MainLayoutWrapper>
    </RouterProvider>
  )
}
