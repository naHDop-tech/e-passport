import { useRecoilValue } from 'recoil'
import { useMemo } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import { MenuItem } from '@components/Header/components/MenuItem'
import { navbarItemsStateSelector } from '@store/navbar/selector'
import { useActiveItem } from './useActiveItem'

import { Logo } from '@components/Logo'

export interface IUserResolveContent {
  header: () => JSX.Element
  navigation: () => JSX.Element
  bottomAction: () => JSX.Element
}

export function useResolveContent(): IUserResolveContent {
  const { pathname } = useLocation()
  const navigateTo = useNavigate()
  const onSelectItem = useActiveItem()
  const { items, itemId } = useRecoilValue(navbarItemsStateSelector)

  const menuList = useMemo(() => {
    return items.map((item) => {
      return (
        <MenuItem
          key={item.id}
          onClick={() => onSelectItem(item)}
          isActive={item.id === itemId}
        >
          {item.title}
        </MenuItem>
      )
    })
  }, [itemId])

  const content = useMemo<IUserResolveContent>(() => {
    if (pathname.includes('/dashboard/settings')) {
      return {
        header: () => (
          <div style={{ cursor: 'pointer' }} onClick={() => navigateTo('/dashboard')}>
            {'< Back'}
          </div>
        ),
        navigation: () => (
          <>
            <h1>Settings</h1>
            {menuList}
          </>
        ),
        bottomAction: () => (
          <>
            <p>Delete account</p>
          </>
        )
      }
    }

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
