import { Web3State } from '../types'

export const defaultState: Web3State = {
  eth: null,
  provider: null,
  contract: null,
  isLoading: true,
}

export enum Actions {
  SetLoading = 'SET_LOADING',
  SetProvider = 'SET_PROVIDER',
  SetContract = 'SET_CONTRACT',
  SetEth = 'SET_ETH',
  ResetData = 'RESET_DATA',
}

export type Web3StateAction =
  | { type: Actions.SetLoading; payload: boolean }
  | { type: Actions.SetProvider; payload: Web3State['provider'] }
  | { type: Actions.SetContract; payload: Web3State['contract'] }
  | { type: Actions.SetEth; payload: Web3State['eth'] }
  | { type: Actions.ResetData }