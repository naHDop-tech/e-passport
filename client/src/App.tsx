import { BrowserRouter as RouterProvider, Routes, Route } from 'react-router-dom'
import { NotFoundPage } from './pages/NotFoundPage'
import './style.css'

import { LoginDLC } from './components/Login'
import { withLayout } from './components/HOC/WithLayout'

const MainLayoutWrapper = withLayout()

export function App(): JSX.Element {
  return (
    <RouterProvider>
      <MainLayoutWrapper>
        <Routes>
          <Route path='/' element={<p>Hello</p>}/>
          <Route path='/login' element={<LoginDLC onSubmit={(data: any) => console.log(data)} />}/>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </MainLayoutWrapper>
    </RouterProvider>
  )
}
