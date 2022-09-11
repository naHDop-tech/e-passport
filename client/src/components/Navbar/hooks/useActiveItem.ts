import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom'

import { activeItemId as activeNavbarItemId } from '@store/navbar/atoms'
import { activeItemId as activeDashboardItemId } from '@store/navbar/dashboard/atoms'
import { Item } from '@store/header/types'

export function useActiveNavbarItem() {
  const setNavbarActiveItem = useSetRecoilState(activeNavbarItemId)
  const navigateTo = useNavigate()

  return (item: Item) => {
    setNavbarActiveItem(item.id)
    navigateTo(item.url)
  }
}


export function useActiveDashboardItem() {
  const setDashboardActiveItem = useSetRecoilState(activeDashboardItemId)
  const navigateTo = useNavigate()

  return (item: Item) => {
    setDashboardActiveItem(item.id)
    navigateTo(item.url)
  }
}
