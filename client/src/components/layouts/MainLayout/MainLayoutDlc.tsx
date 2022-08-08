import { PropsWithChildren, useState, MouseEvent, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import { MainLayout } from './MainLayout'
import { authSelector } from '../../../store/auth/selector'

export function MainLayoutDlc(props: PropsWithChildren<{}>) {
  const { children } = props
  const { isAuth } = useRecoilValue(authSelector)

  return (
    <MainLayout isAuth={isAuth} userEmail='grigory@maroo.us'>{children}</MainLayout>
  )
}
