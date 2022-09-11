import { useRecoilValue, useResetRecoilState } from 'recoil'
import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { MenuItem } from '@components/Header/components/MenuItem'
import { DItem } from '../components/DItem'
import { Logo } from '@components/Logo'
import { navbarItemsStateSelector } from '@store/navbar/selector'
import { dashboardItemsStateSelector } from '@store/navbar/dashboard/selector'
import { deleteAccountItem } from '@store/navbar/atoms'
import { useActiveNavbarItem, useActiveDashboardItem } from './useActiveItem'

import cs from '@components/CommonStyle.module.css'
import { ICommonStyle } from '@components/common-style-types'

const commonStyle = cs as ICommonStyle

import nstyles from '../NavbarStyle.module.css'
import dstyles from '../components/DItem/DItemStyle.module.css'

import LogoutIcon from '@static/icons/logout-icon.svg'

export interface IUserResolveContent {
  header: () => JSX.Element
  navigation: () => JSX.Element
  bottomAction: () => JSX.Element
}

export function useResolveContent(): IUserResolveContent {
  const { pathname } = useLocation()
  const navigateTo = useNavigate()
  const onSelectNavbarItem = useActiveNavbarItem()
  const onSelectDashboardItem = useActiveDashboardItem()
  const { items: nItems, itemId: nItemId } = useRecoilValue(navbarItemsStateSelector)
  const { items: dItems, itemId: dItemId } = useRecoilValue(dashboardItemsStateSelector)

  const settingMenuList = useMemo(() => {
    return nItems.map((item) => {
      return (
        <div key={item.id} className={commonStyle.Margin24}>
          <MenuItem
            onClick={() => onSelectNavbarItem(item)}
            isActive={item.id === nItemId}
          >
            {item.title}
          </MenuItem>
        </div>
      )
    })
  }, [nItemId])

  const dashboardMenuList = useMemo(() => {
    return dItems.map((dItem) => {
      const Icon = dItem.icon
      return (
        <div key={dItem.id} className={commonStyle.Margin24}>
          <DItem
            onClick={() => onSelectDashboardItem(dItem)}
            isActive={dItem.id === dItemId}
          >
            <div className={dstyles.ItemBox}>
                <Icon color='rgba(29, 146, 241, 1)' />
                {dItem.title}
            </div>
          </DItem>
        </div>
      )
    })
  }, [dItemId])

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
            <h1 className={nstyles.NavbarMenuHeader}>Settings</h1>
            {settingMenuList}
          </>
        ),
        bottomAction: () => (
          <div style={{ margin: '0 24px'}}>
            <MenuItem
              key={deleteAccountItem.id}
              onClick={() => onSelectNavbarItem(deleteAccountItem)}
              isActive={deleteAccountItem.id === nItemId}
            >
              {deleteAccountItem.title}
            </MenuItem>
          </div>
        )
      }
    }

    return {
      header: () => (
        <>
          <Logo />
          <div style={{ marginLeft: '10px', }}>Passport</div>
        </>
      ),
      navigation: () => (
        <>
          <h1 className={nstyles.NavbarMenuHeader}>Dashboard</h1>
          {dashboardMenuList}
        </>
      ),
      bottomAction: () => (
        <div onClick={() => navigateTo('/logout')} style={{ margin: '0 24px', cursor: 'pointer' }}>
          <div className={dstyles.ItemBox}>
            <LogoutIcon color='rgba(255, 107, 44, 1)' />
            <p style={{ color: 'rgba(255, 107, 44, 1)' }}>Logout</p>
          </div>
        </div>
      )
    }
  }, [pathname])

  return content
}
