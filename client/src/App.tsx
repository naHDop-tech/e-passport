import { BrowserRouter as RouterProvider, Routes, Route } from 'react-router-dom'
import './style.css'

import { DashboardRouter } from '@root/routes'

import { ToastProvider } from '@root/providers'
import { GuardRoute } from '@components/GuardRoute'
import { withLayout } from '@components/HOC/WithLayout'

import { NotFoundPage } from '@pages/NotFoundPage'
import { SignInPage } from '@pages/SignInPage'
import { SignUpPage } from '@pages/SignUpPage'
import { ResetPasswordPage } from '@pages/ResetPasswordPage'
import { TermsOfConditions } from '@pages/TermsOfConditions'
import { LogoutPage } from '@pages/LogoutPage'
import { useWeb3 } from '@hooks/useWeb3'

const MainLayoutWrapper = withLayout()

export function App(): JSX.Element {
  const { eth } = useWeb3()
  console.log(eth)
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
