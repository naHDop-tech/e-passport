import { selector } from 'recoil'

import { headerItems, activeItemId } from './atoms'

export const headerItemsStateSelector = selector({
  key: 'headerState',
  get: ({ get }) => {
    const items = get(headerItems);
    const itemId = get(activeItemId);

    return {
      items,
      itemId,
     }
  },
})