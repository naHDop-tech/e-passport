import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { Logo } from '@components/Logo'

export interface IUserResolveContent {
  header: () => JSX.Element
  navigation: () => JSX.Element
  bottomAction: () => JSX.Element
}

export function useResolveContent(): IUserResolveContent {
  const { pathname } = useLocation()

  const content = useMemo<IUserResolveContent>(() => {
    return {
      header: () => (
        <>
          <Logo />
          <div style={{ marginLeft: '10px' }}>Passport</div>
        </>
      ),
      navigation: () => (
        <>
          <p>Link1</p>
          <p>Link2</p>
          <p>Link3</p>
        </>
      ),
      bottomAction: () => (
        <>
          <p>Action</p>
        </>
      )
    }
  }, [pathname])

  return content
}
