import { BrowserRouter as RouterProvider, Routes, Route } from 'react-router-dom'
import './style.css'

import { Login } from './components/Login'
import { MainLayout } from './components/layouts/MainLayout'
import { withUserInfo } from './components/HOC/WithUserInfo'

const MainLayoutWrapper = withUserInfo(MainLayout)

export function App(): JSX.Element {
  return (
    <RouterProvider>
      <MainLayoutWrapper>
        <Routes>
          <Route path='/' element={<>Hello</>}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </MainLayoutWrapper>
    </RouterProvider>
  )
}
