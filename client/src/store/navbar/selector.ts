import { selector } from 'recoil'

import { navbarItems, activeItemId } from './atoms'

export const navbarItemsStateSelector = selector({
  key: 'navbarState',
  get: ({ get }) => {
    const items = get(navbarItems);
    const itemId = get(activeItemId);

    return {
      items,
      itemId,
     }
  },
})