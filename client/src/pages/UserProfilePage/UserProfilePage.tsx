import { Suspense } from 'react';

import { UserProfileDlc } from '@components/UserProfile'

export function UserProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfileDlc />
    </Suspense>
  )
}
