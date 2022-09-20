import { Web3State } from '../types'

import {
  Actions,
  Web3StateAction
} from './state'

export const web3StateReducer = (
  state: Web3State,
  action: Web3StateAction
): Web3State => {
  switch (action.type) {
    case Actions.SetLoading:
      return { ...state, isLoading: action.payload }
    case Actions.SetContract:
      return { ...state, contract: action.payload }
    case Actions.SetEth:
      return { ...state, eth: action.payload }
    case Actions.SetProvider:
      return { ...state, provider: action.payload }
    case Actions.ResetData:
      return { ...state, eth: null, contract: null, provider: null }
    default:
      throw new Error('Web3State provider Error during dispatch')
  }
}