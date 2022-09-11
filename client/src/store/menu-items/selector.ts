import { selector } from 'recoil'

import { navItems, activeItemId } from './atoms'

export const itemsStateSelector = selector({
  key: 'headerState',
  get: ({ get }) => {
    const items = get(navItems);
    const itemId = get(activeItemId);

    return {
      items,
      itemId,
     }
  },
})