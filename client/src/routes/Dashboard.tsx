import { Routes, Route } from 'react-router-dom'

import { GuardRoute } from '@components/GuardRoute'
import { NotFoundPage } from '@pages/NotFoundPage'
import { Dashboard } from '@pages/Dashboard'
import { SettingsRouter } from './Settings'

export function DashboardRouter() {
  return (
    <Routes>
      {/* guard routes */}
      <Route path='/' element={<GuardRoute><Dashboard /></GuardRoute>} />
      <Route path='/settings/*' element={<SettingsRouter />} />
      <Route path='/passport' element={<GuardRoute><p>passport</p></GuardRoute>} />

      {/* not found route */}
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  )
}
