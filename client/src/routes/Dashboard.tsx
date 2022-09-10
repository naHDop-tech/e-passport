import { Routes, Route } from 'react-router-dom'

import { GuardRoute } from '@components/GuardRoute'
import { NotFoundPage } from '@pages/NotFoundPage'

export function DashboardRouter() {
  return (
    <Routes>
      {/* guard routes */}
      <Route path='/settings' element={<GuardRoute><p>settings</p></GuardRoute>} />
      <Route path='/passport' element={<GuardRoute><p>passport</p></GuardRoute>} />

      {/* not found route */}
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  )
}
