import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom'

import { activeItemId, menuOpenStatus } from '@store/header/atoms'
import { Item } from '@store/header/types'

export function useActiveItem() {
  const setActiveItem = useSetRecoilState(activeItemId)
  const setIsCheckboxActive = useSetRecoilState(menuOpenStatus)

  const navigateTo = useNavigate()

  return (item: Item) => {
    setIsCheckboxActive(false)
    setActiveItem(item.id)
    navigateTo(item.url)
  }
}
