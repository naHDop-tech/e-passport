import { BrowserRouter as RouterProvider, Routes, Route } from 'react-router-dom'
import './style.css'

import { ToastProvider } from '@components/Toast/Provider'
import { GuardRouteDlc as GuardRoute} from '@components/GuardRoute'
import { NotFoundPage } from '@pages/NotFoundPage'
import { SignInPage } from '@pages/SignInPage'
import { SignUpPage } from '@pages/SignUpPage'
import { ResetPasswordPage } from '@pages/ResetPasswordPage'
import { TermsOfConditions } from '@pages/TermsOfConditions'
import { withLayout } from '@components/HOC/WithLayout'

const MainLayoutWrapper = withLayout()

export function App(): JSX.Element {
  return (
    <RouterProvider>
      <ToastProvider>
        <MainLayoutWrapper>
          <Routes>
            {/* common routes */}
            <Route path='/' element={<p>Hello</p>}/>
            <Route path='/sign-in' element={<SignInPage />}/>
            <Route path='/sign-up' element={<SignUpPage />}/>
            <Route path='/reset-password' element={<ResetPasswordPage />}/>
            <Route path='/terms-of-conditions' element={<TermsOfConditions />} />

            {/* guard routes */}
            <GuardRoute path='/dashboard/settings' element={<p>settings</p>} />
            <GuardRoute path='/dashboard/passport' element={<p>passport</p>} />
            <GuardRoute path='/logout' element={<p>logout</p>} />

            {/* not found route */}
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </MainLayoutWrapper>
      </ToastProvider>
    </RouterProvider>
  )
}
