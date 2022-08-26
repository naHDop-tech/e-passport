import { BrowserRouter as RouterProvider, Routes, Route } from 'react-router-dom'
import { NotFoundPage } from './pages/NotFoundPage'
import './style.css'

import { LoginPage } from './pages/LoginPage'
import { withLayout } from './components/HOC/WithLayout'

const MainLayoutWrapper = withLayout()

export function App(): JSX.Element {
  return (
    <RouterProvider>
      <MainLayoutWrapper>
        <Routes>
          <Route path='/' element={<p>Hello</p>}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </MainLayoutWrapper>
    </RouterProvider>
  )
}
