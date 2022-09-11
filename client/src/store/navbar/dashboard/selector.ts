import { selector } from 'recoil'

import { dashboardItems, activeItemId } from './atoms'

export const dashboardItemsStateSelector = selector({
  key: 'dashboardState',
  get: ({ get }) => {
    const items = get(dashboardItems);
    const itemId = get(activeItemId);

    return {
      items,
      itemId,
     }
  },
})