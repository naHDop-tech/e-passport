import { useRecoilValue, useResetRecoilState } from 'recoil'
import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { MenuItem } from '@components/Header/components/MenuItem'
import { Logo } from '@components/Logo'
import { navbarItemsStateSelector } from '@store/navbar/selector'
import { deleteAccountItem } from '@store/navbar/atoms'
import { useActiveItem } from './useActiveItem'

import cs from '@components/CommonStyle.module.css'
import { ICommonStyle } from '@components/common-style-types'

const commonStyle = cs as ICommonStyle

import styles from '../NavbarStyle.module.css'

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

  const settingMenuList = useMemo(() => {
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
          <div className={commonStyle.CursorPointer} onClick={() => navigateTo('/dashboard')}>
            {'< Back'}
          </div>
        ),
        navigation: () => (
          <>
            <h1 className={styles.NavbarMenuHeader}>Settings</h1>
            {settingMenuList}
          </>
        ),
        bottomAction: () => (
          <MenuItem
            key={deleteAccountItem.id}
            onClick={() => onSelectItem(deleteAccountItem)}
            isActive={deleteAccountItem.id === itemId}
          >
            {deleteAccountItem.title}
          </MenuItem>
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
