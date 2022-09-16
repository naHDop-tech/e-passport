import { Routes, Route } from 'react-router-dom'

import { GuardRoute } from '@components/GuardRoute'
import { NotFoundPage } from '@pages/NotFoundPage'
import { SettingsPage } from '@pages/SettingsPage'
import { UserProfilePage } from '@pages/UserProfilePage'

export function SettingsRouter() {
  return (
    <Routes>
      {/* guard routes */}
      <Route path='/' element={<GuardRoute><SettingsPage /></GuardRoute>} />
      <Route path='/profile' element={<GuardRoute><UserProfilePage /></GuardRoute>} />
      <Route path='/preferences' element={<GuardRoute><p>preferences</p></GuardRoute>} />
      <Route path='/notification' element={<GuardRoute><p>notification</p></GuardRoute>} />
      <Route path='/security' element={<GuardRoute><p>security</p></GuardRoute>} />
      <Route path='/delete-account' element={<GuardRoute><p>Delete Account</p></GuardRoute>} />

      {/* not found route */}
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  )
}
