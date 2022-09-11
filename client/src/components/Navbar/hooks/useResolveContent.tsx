import { useRecoilValue } from 'recoil'
import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { MenuItem } from '@components/Header/components/MenuItem'
import { DItem } from '../components/DItem'
import { Logo } from '@components/Logo'
import { itemsStateSelector } from '@store/menu-items/selector'
import { useActiveItem } from '@hooks/useActiveItem'

import cs from '@components/CommonStyle.module.css'
import { ICommonStyle } from '@components/common-style-types'

const commonStyle = cs as ICommonStyle

import nstyles from '../NavbarStyle.module.css'
import dstyles from '../components/DItem/DItemStyle.module.css'

import {
  LogoutItemItem,
  SettingsItem,
  DashboardItem,
  FingerprintItem,
  PassportItem,
  DeleteItem,
} from '@store/menu-items/constants'

import LogoutIcon from '@static/icons/logout-icon.svg'
import SettingsIcon from '@static/icons/settings-icon.svg'
import DashboardIcon from '@static/icons/dashboard-icon.svg'
import FingerPrintIcon from '@static/icons/fingerprint-icon.svg'
import PassportIcon from '@static/icons/passport-icon.svg'

const IconMap = {
  [LogoutItemItem.Id]: LogoutIcon,
  [SettingsItem.Id]: SettingsIcon,
  [DashboardItem.Id]: DashboardIcon,
  [FingerprintItem.Id]: FingerPrintIcon,
  [PassportItem.Id]: PassportIcon,
}
export interface IUserResolveContent {
  header: () => JSX.Element
  navigation: () => JSX.Element
  bottomAction: () => JSX.Element
}

export function useResolveContent(): IUserResolveContent {
  const { pathname } = useLocation()
  const navigateTo = useNavigate()
  const { items, itemId } = useRecoilValue(itemsStateSelector)
  const onSelectItem = useActiveItem()

  const settingMenuList = useMemo(() => {
    return items.settings.map((item) => {
      return (
        <div key={item.Id} className={commonStyle.Margin24}>
          <MenuItem
            onClick={() => onSelectItem(item)}
            isActive={item.Id === itemId}
          >
            {item.Title}
          </MenuItem>
        </div>
      )
    })
  }, [itemId])

  const dashboardMenuList = useMemo(() => {
    return items.dashboard.map((item) => {
      const Icon = IconMap[item.Id]
      return (
        <div key={item.Id} className={commonStyle.Margin24}>
          <DItem
            onClick={() => onSelectItem(item)}
            isActive={item.Id === itemId}
          >
            <div className={dstyles.ItemBox}>
                <Icon color='rgba(29, 146, 241, 1)' />
                {item.Title}
            </div>
          </DItem>
        </div>
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
            <h1 className={nstyles.NavbarMenuHeader}>Settings</h1>
            {settingMenuList}
          </>
        ),
        bottomAction: () => (
          <div style={{ margin: '0 24px'}}>
            <MenuItem
              key={DeleteItem.Id}
              onClick={() => onSelectItem(DeleteItem)}
              isActive={DeleteItem.Id === itemId}
            >
              {DeleteItem.Title}
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
