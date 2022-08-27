import { BrowserRouter as RouterProvider, Routes, Route } from 'react-router-dom'
import './style.css'

import { NotFoundPage } from '@pages/NotFoundPage'
import { SignInPage } from '@root/pages/SignInPage'
import { SignUpPage } from '@root/pages/SignUpPage'
import { ResetPasswordPage } from '@root/pages/ResetPasswordPage'
import { withLayout } from '@components/HOC/WithLayout'

const MainLayoutWrapper = withLayout()

export function App(): JSX.Element {
  return (
    <RouterProvider>
      <MainLayoutWrapper>
        <Routes>
          <Route path='/' element={<p>Hello</p>}/>
          <Route path='/sign-in' element={<SignInPage />}/>
          <Route path='/sign-up' element={<SignUpPage />}/>
          <Route path='/reset-password' element={<ResetPasswordPage />}/>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </MainLayoutWrapper>
    </RouterProvider>
  )
}
