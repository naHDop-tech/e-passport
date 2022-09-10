import { Routes, Route } from 'react-router-dom'

import { GuardRoute } from '@components/GuardRoute'
import { NotFoundPage } from '@pages/NotFoundPage'

export function SettingsRouter() {
  return (
    <Routes>
      {/* guard routes */}
      <Route path='/' element={<GuardRoute><p>Settings</p></GuardRoute>} />
      <Route path='/profile' element={<GuardRoute><p>profile</p></GuardRoute>} />
      <Route path='/preferences' element={<GuardRoute><p>preferences</p></GuardRoute>} />
      <Route path='/notification' element={<GuardRoute><p>notification</p></GuardRoute>} />
      <Route path='/security' element={<GuardRoute><p>security</p></GuardRoute>} />
      <Route path='/delete-account' element={<GuardRoute><p>Delete Account</p></GuardRoute>} />

      {/* not found route */}
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  )
}
