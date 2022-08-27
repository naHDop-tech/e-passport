import { BrowserRouter as RouterProvider, Routes, Route } from 'react-router-dom'
import './style.css'

import { NotFoundPage } from '@pages/NotFoundPage'
import { SignInPage } from '@root/pages/SignInPage'
import { withLayout } from '@components/HOC/WithLayout'

const MainLayoutWrapper = withLayout()

export function App(): JSX.Element {
  return (
    <RouterProvider>
      <MainLayoutWrapper>
        <Routes>
          <Route path='/' element={<p>Hello</p>}/>
          <Route path='/sign-in' element={<SignInPage />}/>
          <Route path='/sign-up' element={<><h1>Sign up</h1></>}/>
          <Route path='/reset-password' element={<><h1>Reset password</h1></>}/>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </MainLayoutWrapper>
    </RouterProvider>
  )
}
