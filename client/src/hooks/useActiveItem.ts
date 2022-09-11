import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom'

import { activeItemId } from '@store/menu-items/atoms'
import { menuOpenStatus } from '@store/header/atoms'
import { IItem } from '@store/menu-items/constants'

export function useActiveItem() {
  const setActiveItem = useSetRecoilState(activeItemId)
  const setMenuOpenSTatus = useSetRecoilState(menuOpenStatus)

  const navigateTo = useNavigate()

  return (item: IItem) => {
    setMenuOpenSTatus(false)
    setActiveItem(item.Id)
    navigateTo(item.Url)
  }
}
