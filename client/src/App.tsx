import { BrowserRouter as RouterProvider, Routes, Route } from 'react-router-dom'
import './style.css'

import { DashboardRouter } from '@root/routes'

import { ToastProvider } from '@components/Toast/Provider'
import { GuardRoute } from '@components/GuardRoute'
import { withLayout } from '@components/HOC/WithLayout'

import { NotFoundPage } from '@pages/NotFoundPage'
import { SignInPage } from '@pages/SignInPage'
import { SignUpPage } from '@pages/SignUpPage'
import { ResetPasswordPage } from '@pages/ResetPasswordPage'
import { TermsOfConditions } from '@pages/TermsOfConditions'
import { LogoutPage } from '@pages/LogoutPage'
import { Spinner } from '@components/Spinner'

const MainLayoutWrapper = withLayout()

export function App(): JSX.Element {
  return (
    <RouterProvider>
      <ToastProvider>
        <MainLayoutWrapper>
          <Routes>
            {/* common routes */}
            <Route path='/' element={
                              <Spinner isLoading={true}>
                                <div>Hello</div>
                              </Spinner>}/>
            <Route path='/sign-in' element={<SignInPage />}/>
            <Route path='/sign-up' element={<SignUpPage />}/>
            <Route path='/reset-password' element={<ResetPasswordPage />}/>
            <Route path='/terms-of-conditions' element={<TermsOfConditions />} />

            {/* guard routes */}
            <Route path='/dashboard/*' element={<DashboardRouter />} />
            <Route path='/logout' element={<GuardRoute><LogoutPage /></GuardRoute>} />

            {/* not found route */}
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </MainLayoutWrapper>
      </ToastProvider>
    </RouterProvider>
  )
}
