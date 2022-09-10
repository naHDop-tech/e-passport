import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom'

import { activeItemId } from '@store/navbar/atoms'
import { Item } from '@store/header/types'

export function useActiveItem() {
  const setActiveItem = useSetRecoilState(activeItemId)
  const navigateTo = useNavigate()

  return (item: Item) => {
    setActiveItem(item.id)
    navigateTo(item.url)
  }
}
