import { useContext } from 'react'

import { Web3Context } from '@root/providers'

export function useWeb3() {
  return useContext(Web3Context)
}
